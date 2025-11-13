<?php

declare(strict_types=1);

namespace App\Controller;

use App\Adapter\App\Database\Doctrine\Repository\BlogpostRepository;
use App\Adapter\App\Database\Doctrine\Repository\CollectionRepository;
use App\Adapter\App\Database\Doctrine\Repository\TagRepository;
use App\Constant\FolderConstants;
use App\Constant\WebsiteSettingConstants;
use App\Mapper\BlogpostMapper;
use App\Service\BlogpostService;
use App\Service\CollectionService;
use App\ValueObject\OpenGraph\WebsiteValueObject;
use Exception;
use Pimcore\Bundle\AdminBundle\Controller\Admin\LoginController;
use Pimcore\Model\Asset;
use Pimcore\Model\DataObject\Blogpost;
use Pimcore\Model\DataObject\Collection;
use Pimcore\Model\DataObject\SocialChannel;
use Pimcore\Model\Document\Page;
use Pimcore\Model\Exception\NotFoundException;
use Pimcore\Model\WebsiteSetting;
use Symfony\Bridge\Twig\Attribute\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use function array_slice;
use function count;

class DefaultController extends BaseController
{
    public function __construct(
        private readonly BlogpostRepository $blogpostRepository,
        private readonly BlogpostMapper $blogpostMapper,
        private readonly BlogpostService $blogpostService,
        private readonly CollectionRepository $collectionRepository,
        private readonly CollectionService $collectionService,
        private readonly TagRepository $tagRepository,
    ) {
    }

    #[Template('content/home.html.twig')]
    #[Route(
        '/',
        name: 'homepage'
    )]
    public function indexAction(Request $request,
    ): array {
        $paramBag = $this->getAllParameters($request);

        // Get random hero image
        $heroImagesFolder      = Asset::getByPath(FolderConstants::ASSET_WEBSITE_HERO_IMAGES);
        $heroImages            = $heroImagesFolder?->getChildren()?->getAssets();
        $heroImage             = $heroImages ? $heroImages[random_int(0, count($heroImages) - 1)] : null;
        $paramBag['heroImage'] = $heroImage;
        $paramBag['headTitle'] = $this->document->getTitle();

        // Latest blogposts
        $latestPosts = [];
        foreach ($this->blogpostRepository->findLatest(4) as $post) {
            $latestPosts[] = $this->blogpostMapper->fromModel($post);
        }

        // Collections
        $collections = $this->collectionRepository->findAll();
        shuffle($collections);

        // Tags
        $tags = $this->tagRepository->findAllCurrentlyRelated();

        return array_merge($paramBag, [
            'latestPosts'    => $latestPosts,
            'collections'    => array_slice($collections, 0, 4),
            'tags'           => $tags,
            'socialChannels' => (new SocialChannel\Listing())->getObjects(),
            'openGraph'      => new WebsiteValueObject(
                title: $this->document->getTitle(),
                description: $this->document->getDescription(),
                image: $heroImage ? $request->getSchemeAndHttpHost().$heroImage->getFullPath() : '',
                url: $request->getUri(),
            ),
        ]);
    }

    #[Route(
        '/{slug}',
        requirements: [
            'slug' => '[\w-]+',
        ]
    )]
    public function subAction(string $slug, Request $request): Response
    {
        // Forward pages to defined controller and action
        $page = Page::getByPath('/'.$slug);
        if ($page instanceof Page) {
            return $this->forward($page->getController());
        }

        // Collections
        $collection = $this->collectionRepository->getBySlug($slug);
        if ($collection instanceof Collection) {
            return $this->collectionAction($slug, $request, $collection);
        }

        // Blogposts
        $blogpost = $this->blogpostRepository->getBySlug($slug);
        if ($blogpost instanceof Blogpost) {
            return $this->blogpostAction($slug, $request, $blogpost);
        }

        // Redirect legacy WordPress slugs to Pimcore blogpost
        $blogpost = $this->blogpostRepository->getByWordPressSlug($slug);
        if ($blogpost instanceof Blogpost) {
            return $this->redirect($blogpost->getSlug(), Response::HTTP_MOVED_PERMANENTLY);
        }

        return $this->notFoundAction($request);
    }

    /**
     * @throws Exception
     */
    #[Route(
        name: 'blogpost-detail',
    )]
    public function blogpostAction(string $slug, Request $request, ?Blogpost $blogpost): Response
    {
        if (!$blogpost instanceof Blogpost) {
            $blogpost = $this->blogpostRepository->getBySlug($slug);
        }

        $blogpostDto = $this->blogpostMapper->fromModel($blogpost);

        $paramBag = $this->getAllParameters($request);

        $paramBag = array_merge($paramBag, [
            'blogpost'    => $blogpostDto,
            'openGraph'   => $this->blogpostService->getOpenGraphData($request, $blogpostDto),
            'commentForm' => $this->blogpostService->createOrHandleCommentForm($request),
        ]);

        return $this->render('content/blogpost/blogpost.html.twig', $paramBag);
    }

    /**
     * @throws Exception
     */
    #[Route(
        name: 'collection',
    )]
    public function collectionAction(string $slug, Request $request, ?Collection $collection): Response
    {
        if (!$collection instanceof Collection) {
            $collection = $this->collectionRepository->getBySlug($slug);
        }

        $paramBag = $this->getAllParameters($request);

        $blogposts = $this->blogpostService->getBlogpostsByCollection($collection) ?? [];

        // Image Teaser
        $imageTeaser = $collection->getImageTeaser();
        if (
            !$imageTeaser instanceof Asset\Image
            && count($blogposts) > 0
        ) {
            $imageTeaser = $blogposts[array_rand($blogposts)]->imageTeaser;
        }

        return $this->render('content/collection/collection.html.twig', array_merge($paramBag, [
            'collection'  => $collection,
            'collections' => $this->collectionService->getRecommendedCollections($collection),
            'imageTeaser' => $imageTeaser,
            'blogposts'   => $this->blogpostService->getBlogpostsByCollection($collection) ?? [],
            'tagList'     => $this->tagRepository->findAllCurrentlyRelated(),
            'openGraph'   => $this->collectionService->getOpenGraphData($request, $collection),
        ]));
    }

    /**
     * @throws Exception
     */
    #[Route(
        '/tags',
        name: 'tags',
        priority: 10
    )]
    public function tagListAction(Request $request): Response
    {
        $paramBag = $this->getAllParameters($request);

        $tagPairs = [];

        foreach ($request->query->all() as $tagCategorySlug => $tags) {
            $tagSlugs = explode('.', $tags);

            foreach ($tagSlugs as $tagSlug) {
                $tagPairs[] = [
                    'parentSlug' => $tagCategorySlug,
                    'tagSlug'    => $tagSlug,
                ];
            }
        }

        $tags = [];

        foreach ($tagPairs as $tagPair) {
            try {
                $tags[] = $this->tagRepository->getByParentAndTagSlugs($tagPair);
            } catch (NotFoundException) {
            }
        }

        $blogposts = $this->blogpostRepository->findAllByTags($tags, 'AND', $request->query->has('autor'));

        $blogposts = array_map(
            fn (Blogpost $blogpost) => $this->blogpostMapper->fromModel($blogpost),
            $blogposts
        );

        // Random hero image
        $blogpostTeaser = empty($blogposts) === false ? $blogposts[array_rand($blogposts)] : null;

        return $this->render('content/tags/list.html.twig', array_merge($paramBag, [
            'blogposts' => $blogposts,
            'tagList'   => $this->tagRepository->findAllCurrentlyRelated(),
            'tags'      => $tags,
            'heroImage' => $blogpostTeaser?->imageMain,
        ]));
    }

    public function notFoundAction(Request $request): Response
    {
        $paramBag              = $this->getAllParameters($request);

        // Hero image
        try {
            $websiteSetting = WebsiteSetting::getByName(WebsiteSettingConstants::ERROR_TEASER_IMAGE);
        } catch (NotFoundException) {
            $websiteSetting = null;
        }

        if ($websiteSetting instanceof WebsiteSetting) {
            $teaserImage = $websiteSetting->getData();
        }

        // Latest blogposts
        $latestPosts = [];
        foreach ($this->blogpostRepository->findLatest(4) as $post) {
            $latestPosts[] = $this->blogpostMapper->fromModel($post);
        }

        // Collections
        $collections = $this->collectionRepository->findAll();
        shuffle($collections);

        $content = $this->renderView('error/404.html.twig', array_merge($paramBag, [
            'headTitle' => '404 - Seite nicht gefunden',
            'heroImage' => $teaserImage instanceof Asset\Image ? $teaserImage : null,
            'latestPosts'    => $latestPosts,
            'collections'    => array_slice($collections, 0, 4),
        ]));

        return new Response($content, Response::HTTP_NOT_FOUND);
    }

    public function cmsAction(Request $request): Response
    {
        $paramBag = $this->getAllParameters($request);

        // Get the template name from the document
        $templateName = $this->document?->getTemplate() ?? 'content/cms/page.html.twig';

        return $this->render($templateName, $paramBag);
    }

    /**
     * Forwards the request to admin login.
     */
    public function loginAction(): Response
    {
        return $this->forward(LoginController::class.'::loginCheckAction');
    }
}
