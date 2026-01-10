<?php

declare(strict_types=1);

namespace App\Service;

use App\Adapter\App\Database\Doctrine\Repository\BlogpostRepository;
use App\Adapter\App\Database\Doctrine\Repository\CommentRepository;
use App\Dto\BlogpostDto;
use App\Dto\CommentDto;
use App\Handler\BlogpostActionsHandler;
use App\Mapper\BlogpostMapper;
use App\Mapper\CommentMapper;
use App\OpenAI\Service\OpenAIService;
use App\ValueObject\BlogpostCommentValueObject;
use App\ValueObject\OpenGraph\ArticleValueObject;
use Carbon\Carbon;
use Exception;
use Pimcore\Bundle\ApplicationLoggerBundle\ApplicationLogger;
use Pimcore\Mail;
use Pimcore\Model\Asset;
use Pimcore\Model\Asset\Image;
use Pimcore\Model\DataObject;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\Validator\ConstraintViolation;
use Symfony\Component\Validator\ConstraintViolationList;
use Symfony\Component\Validator\ConstraintViolationListInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Contracts\Translation\TranslatorInterface;
use Throwable;

use function count;
use function in_array;
use function sprintf;

class BlogpostService
{
    public function __construct(
        private readonly SluggerInterface $slugger,
        private readonly FormFactoryInterface $formFactory,
        private readonly CaptchaService $captchaService,
        private readonly TranslatorInterface $translator,
        private readonly ValidatorInterface $validator,
        private readonly CommentMapper $commentMapper,
        private readonly CommentRepository $commentRepository,
        private readonly BlogpostRepository $blogpostRepository,
        private readonly BlogpostMapper $blogpostMapper,
        private readonly OpenAIService $openAIService,
        private readonly BlogpostActionsHandler $blogpostActionsHandler,
        private readonly CrawlerService $crawlerService,
        private readonly RouterInterface $router,
    ) {
    }

    public function setSlug(DataObject\Blogpost $blogpost): void
    {
        $slug   = [];
        $slug[] = $blogpost->getTitle();

        $blogpost->setSlug($this->slugger->slug(implode(' ', $slug))->lower()->toString());
    }

    public function createOrHandleCommentForm(Request $request): BlogpostCommentValueObject
    {
        $builder = $this->formFactory->createBuilder();

        $captcha = $this->captchaService->getCaptcha();

        $form = $builder
            ->add('result', TextType::class,
                [
                    'label' => false,
                    'attr'  => [
                        'placeholder' => $this->translator->trans('blogpost.comments.form.result.placeholder'),
                    ],
                ])
            ->add('name', TextType::class,
                [
                    'label' => false,
                    'attr'  => [
                        'placeholder' => $this->translator->trans('blogpost.comments.form.name.placeholder'),
                    ],
                ])
            ->add('email', TextType::class,
                [
                    'label' => false,
                    'attr'  => [
                        'placeholder' => $this->translator->trans('blogpost.comments.form.email.placeholder'),
                    ],
                ])
            ->add('website', TextType::class,
                [
                    'label' => false,
                    'attr'  => [
                        'placeholder' => $this->translator->trans('blogpost.comments.form.website.placeholder'),
                    ],
                ])
            ->add('comment', TextType::class,
                [
                    'label' => false,
                    'attr'  => [
                        'placeholder' => $this->translator->trans('blogpost.comments.form.comment.placeholder'),
                    ],
                ])
            ->add('submit', SubmitType::class,
                [
                    'label' => $this->translator->trans('blogpost.comments.form.button.value'),
                    'attr'  => [
                        'class' => 'js-recaptcha',
                    ],
                ])
            ->add('cake', HiddenType::class,
                [
                    'data' => $captcha['cacheKey'],
                ])
            ->add('blogpostId', HiddenType::class)
            ->add('pid', HiddenType::class)
            ->add('referenceId', HiddenType::class)
            ->getForm();

        $form->handleRequest($request);
        $errors = null;

        if ($form->isSubmitted()) {
            $errors = $this->handleCommentForm($form, $request);
        }

        $formView      = $form->createView();
        $formSubmitted = $form->isSubmitted();

        unset($form);

        return new BlogpostCommentValueObject(
            formView: $formView,
            captcha: $captcha,
            isHandled: $formSubmitted === true && $errors === null,
            errors: $errors
        );
    }

    /**
     * @return BlogpostDto[]
     *
     * @throws Exception
     */
    public function getBlogpostsByCollection(DataObject\Collection $collection): array
    {
        $blogposts = [];

        // Tags
        $tags = $collection->getTags();
        if (!empty($tags)) {
            $blogposts = array_unique(
                array_merge($this->blogpostRepository->findAllByTags($tags), $blogposts)
            );
        }

        // Excluded Tags
        $blogposts = array_filter($blogposts,
            static function (DataObject\Blogpost $blogpost) use ($collection) {
                foreach ($blogpost->getTags() as $tag) {
                    if (in_array($tag, $collection->getTagsExcluded(), true)) {
                        return false;
                    }
                }

                return true;
            }
        );

        // Blogposts
        $blogposts = array_unique(
            array_merge($collection->getBlogposts(), $blogposts)
        );

        // Exclude Blogposts
        $blogposts = array_filter($blogposts,
            static fn (DataObject\Blogpost $blogpost) => !in_array($blogpost, $collection->getBlogpostsExcluded(), true)
        );

        $blogpostMapper = $this->blogpostMapper;

        return array_map(
            static fn (DataObject\Blogpost $blogpost) => $blogpostMapper->fromModel($blogpost),
            $blogposts
        );
    }

    /**
     * @return array<string, ConstraintViolationList[]>
     *
     * @throws Exception
     */
    public function checkDataQuality(DataObject\Blogpost $blogpost): array
    {
        $blogpostDto = $this->blogpostMapper->fromModel($blogpost);

        $dataQuality[BlogpostDto::VALIDATION_GROUP_DATA_QUALITY_BASE_DATA]              = $this->validator->validate($blogpostDto, groups: [BlogpostDto::VALIDATION_GROUP_DATA_QUALITY_BASE_DATA]);
        $dataQuality[BlogpostDto::VALIDATION_GROUP_DATA_QUALITY_ASSETS_DOWNLOADS_LINKS] = $this->validator->validate($blogpostDto, groups: [BlogpostDto::VALIDATION_GROUP_DATA_QUALITY_ASSETS_DOWNLOADS_LINKS]);
        $dataQuality[BlogpostDto::VALIDATION_GROUP_DATA_QUALITY_CONTENT]                = $this->validator->validate($blogpostDto, groups: [BlogpostDto::VALIDATION_GROUP_DATA_QUALITY_CONTENT]);
        $dataQuality[BlogpostDto::VALIDATION_GROUP_DATA_QUALITY_SEO]                    = $this->validator->validate($blogpostDto, groups: [BlogpostDto::VALIDATION_GROUP_DATA_QUALITY_SEO]);

        $validationErrors = 0;
        array_map(static function ($section) use (&$validationErrors): void { $validationErrors += count($section); }, $dataQuality);

        return $dataQuality;
    }

    /**
     * @throws Exception
     */
    public function hasDataQualityIssues(DataObject\Blogpost $blogpost, ?string $group = null): bool
    {
        $dataQuality = $this->checkDataQuality($blogpost);

        $validationErrors = 0;
        $dataQualityMap   = $group !== null ? [$dataQuality[$group]] ?? [] : $dataQuality;

        array_map(static function ($section) use (&$validationErrors): void { $validationErrors += count($section); }, $dataQualityMap);

        return $validationErrors > 0;
    }

    public function generateSocialPreviewThumbnails(DataObject\Blogpost $object): void
    {
        $existingSocialMediaImage = $object->getSocialPreviewThumbnail();
        if ($existingSocialMediaImage instanceof Image) {
            return;
        }

        $mainImage = $object->getImageMain();

        if (!$mainImage instanceof Image) {
            return;
        }

        $assetsFolder = $object->getAssetsFolder();
        if (!$assetsFolder instanceof Asset) {
            return;
        }

        $name = sprintf(
            'socialPreviewThumbnail_%s.jpg',
            $object->getId()
        );

        $socialPreviewThumbnail = $mainImage->getThumbnail('socialPreviewImage', false);

        $stream    = $socialPreviewThumbnail->getStream();
        $imageData = stream_get_contents($stream);

        // Delete existing asset
        $asset = Asset::getByPath($assetsFolder->getFullPath().'/'.$name);
        if ($asset instanceof Image) {
            $asset->delete();
        }

        $asset = new Image();
        $asset->setData($imageData);
        $asset->setKey($name);
        $asset->setParent($assetsFolder);
        $asset->setFilename($name);
        $asset->save();

        $object->setSocialPreviewThumbnail($asset);

        $this->blogpostRepository->persist($object);
    }

    public function getOpenGraphData(Request $request, BlogpostDto $blogpostDto): ArticleValueObject
    {
        return new ArticleValueObject(
            title: sprintf('%s – %s', $blogpostDto->title ?? '', $blogpostDto->subTitle ?? ''),
            description: $blogpostDto->metaDescription ?? '',
            image: $request->getSchemeAndHttpHost().$blogpostDto->socialPreviewThumbnail?->getFullPath() ?? '',
            url: $request->getUri(),
            authors: $blogpostDto->authors,
            tags: $blogpostDto->activity?->tags ?? [],
            publishedTime: $blogpostDto->publicationDate ?? Carbon::now(),
        );
    }

    /**
     * $forceUpdates: If true, will process even if no action is set, for example during Blogpost "aiCitySpotFactsUpdate" action processing.
     */
    public function processCitySpotActions(DataObject\Blogpost $object, bool $forceUpdates = false): void
    {
        $fieldCollection = $object->getContent();

        if (!$fieldCollection instanceof DataObject\Fieldcollection) {
            return;
        }

        $contents = $fieldCollection->getItems();

        foreach ($contents as $content) {
            if (!$content instanceof DataObject\Fieldcollection\Data\ContentCitySpot) {
                continue;
            }

            $actions = $content->getActions() ?? [];

            // Add action if forced so each CitySpot gets facts updated
            if ($forceUpdates === true) {
                $actions = array_unique(array_merge($actions, [BlogpostActionsHandler::ACTION_AI_CITY_SPORT_FACTS_UPDATE]));
            }

            foreach ($actions as $k => $action) {
                if (
                    $action !== BlogpostActionsHandler::ACTION_AI_CITY_SPORT_FACTS_UPDATE
                ) {
                    continue;
                }

                $prompt = 'Erstelle mir eine Liste mit den wichtigsten 5-7 Kurzfakten über folgende Location meines %s. Ohne Headlines. Kurze, knackige Aussagen zu: %s. Die einzelnen Fakten sollen ohne Punkt am Ende und eineleitenden Zeichen oder Leerzeichen sein. Jeder Fakt soll am Ende ein <br> angefügt bekommen';
                $prompt = sprintf($prompt, $object->getTitle(), $content->getTitle());

                $response = $this->openAIService->blogpost()->response($prompt);

                $content->setFacts($response->outputText);

                unset($actions[$k]);
                $content->setActions($actions);
            }
        }
    }

    /**
     * @throws Exception
     */
    public function processBlogpostActions(DataObject\Blogpost $blogpost): void
    {
        $actions = $blogpost->getActions() ?? [];

        // 2025-12-28 : We currently only use one action here. Needs implementation idea if we have multiple
        foreach ($actions as $k => $action) {
            match (true) {
                $action === BlogpostActionsHandler::ACTION_CRAWL_WORDPRESS_CITY_TRIP_CONTENTS => $this->blogpostActionsHandler->importCityTripContents($blogpost),
                $action === BlogpostActionsHandler::ACTION_CRAWL_LEGACY_TOUR_CONTENTS         => $this->blogpostActionsHandler->importLegacyTourContents($blogpost),
                $action === BlogpostActionsHandler::ACTION_AI_CITY_SPORT_FACTS_UPDATE         => $this->processCitySpotActions($blogpost, true),
                default                                                                       => null,
            };

            unset($actions[$k]);
            $blogpost->setActions($actions);
        }
    }

    public function getExternalLinksStatus(DataObject\Blogpost $blogpost): array
    {
        $schemeAndHost = sprintf(
            '%s://%s',
            $this->router->getContext()->getScheme(),
            $this->router->getContext()->getHost()
        );

        $blogpostUrl = match (true) {
            preg_match('/^http(s{,1}):\/\/localhost/', $schemeAndHost) !== false => 'https://fwgblog.uber.space/staedtetrip-heidelberg',
            default                                                              => sprintf('%s/%s', $schemeAndHost, $blogpost->getSlug()),
        };

        return $this->crawlerService->crawlExternalUrl($blogpostUrl, $schemeAndHost);
    }

    private function handleCommentForm(FormInterface $form, Request $request): ?ConstraintViolationListInterface
    {
        $data = $form->getData();

        $captcha                = $this->captchaService->getCaptcha($data['cake']);
        $captchaResultFromCache = $captcha['result'] ?? null;

        $this->captchaService->removeCaptcha($data['cake']);

        $referenceId = isset($data['referenceId']) ? (string) $data['referenceId'] : null;

        // Reference comment?
        if ($referenceId !== null) {
            $referenceComment = $this->commentRepository->findById($referenceId);

            if ($referenceComment instanceof DataObject\Comment) {
                $referenceCommentDto = $this->commentMapper->fromModel($referenceComment);
            }
        }

        $parentId = $data['pid'] ?? $data['blogpostId'];

        $commentDto = new CommentDto(
            parentId: (int) $parentId,
            dateTime: Carbon::now(),
            name: $data['name'],
            email: $data['email'],
            comment: $data['comment'],
            referenceComment: $referenceCommentDto ?? null,
            website: $data['website'] ?? null,
        );

        // Validation
        $errors = $this->validator->validate($commentDto);

        if (
            $captcha === null
            || (int) $captchaResultFromCache !== (int) $data['result']
        ) {
            ApplicationLogger::getInstance()->alert(
                sprintf(
                    'Invalid comment captcha for parentId %s (eMail: %s)',
                    $data['pid'],
                    $data['email']
                )
            );
            $errors->add(new ConstraintViolation(
                'Invalid captcha result',
                null,
                [],
                null,
                'result',
                $data['result']
            ));
        }

        if ($errors->count() > 0) {
            return $errors;
        }

        // Save the comment to the database or perform other actions
        $comment = $this->commentMapper->toModel($commentDto);

        try {
            $this->commentRepository->persist($comment);

            // Send mail to admin
            $mail = new Mail();
            $mail->addTo('freiweg@outlook.de');
            $mail->text(sprintf('
                Ein neuer Kommentar wartet auf Freischaltung.: %s/admin/login/deeplink?object_%s_object
            ', $request->getSchemeAndHttpHost(), $comment->getId() ?? ''));
            $mail->subject('Neuer Blog Kommentar');
            $mail->send();
        } catch (Throwable $exception) {
            ApplicationLogger::getInstance()->error(
                sprintf(
                    'Error while saving comment for parentId %s (eMail: %s): %s',
                    $data['pid'],
                    $data['email'],
                    $exception->getMessage()
                )
            );
            $errors->add(new ConstraintViolation(
                'Beim Speichern des Kommentars ist ein Fehler aufgetreten. Bitte versuche es später erneut.',
                null,
                [],
                null,
                'comment',
                $exception->getMessage()
            ));

            return $errors;
        }

        return null;
    }
}
