<?php

declare(strict_types=1);

namespace App\Service;

use App\Adapter\App\Database\Doctrine\Repository\CommentRepository;
use App\Dto\CommentDto;
use App\Mapper\CommentMapper;
use App\ValueObject\BlogpostCommentValueObject;
use Carbon\Carbon;
use Pimcore\Bundle\ApplicationLoggerBundle\ApplicationLogger;
use Pimcore\Mail;
use Pimcore\Model\DataObject;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\Validator\ConstraintViolation;
use Symfony\Component\Validator\ConstraintViolationListInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Contracts\Translation\TranslatorInterface;
use Throwable;

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
    ) {
    }

    public function setSlug(DataObject\Blogpost $blogpost): void
    {
        $slug   = [];
        $slug[] = $blogpost->getTitle();

        $blogpost->setSlug($this->slugger->slug(implode(' ', $slug))->toString());
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
            $errors = $this->handleCommentForm($form);
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

    private function handleCommentForm(FormInterface $form): ?ConstraintViolationListInterface
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
                Ein neuer Kommentar wartet auf Freischaltung.: https://frei-weg.com/admin/login/deeplink?object_%s_object
            ', $comment->getId()));
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
