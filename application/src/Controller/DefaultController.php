<?php

declare(strict_types=1);

namespace App\Controller;

use App\Adapter\App\Database\Doctrine\Repository\BlogpostRepository;
use App\Constant\FolderConstants;
use App\Mapper\BlogpostMapper;
use App\Service\BlogpostService;
use Pimcore\Bundle\AdminBundle\Controller\Admin\LoginController;
use Pimcore\Document;
use Pimcore\Model\Asset;
use Pimcore\Model\DataObject\Blogpost;
use Pimcore\Model\DataObject\SocialChannel;
use Pimcore\Model\Document\Page;
use Symfony\Bridge\Twig\Attribute\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use Symfony\Component\Routing\Annotation\Route;
use function count;

class DefaultController extends BaseController
{
    public function __construct(
        private readonly BlogpostRepository $blogpostRepository,
        private readonly BlogpostMapper $blogpostMapper,
        private readonly BlogpostService $blogpostService,
    ) {
    }

    #[Template('content/home.html.twig')]
    #[Route(
        '/',
        name: 'homepage'
    )]
    public function defaultAction(Request $request,
    ): array {
        $paramBag = $this->getAllParameters($request);

        // Get random hero image
        $heroImagesFolder      = Asset::getByPath(FolderConstants::ASSET_WEBSITE_HERO_IMAGES);
        $heroImages            = $heroImagesFolder?->getChildren()?->getAssets();
        $paramBag['heroImage'] = $heroImages ? $heroImages[random_int(0, count($heroImages) - 1)] : null;
        $paramBag['headTitle'] = $this->document->getTitle();

        $latestPosts = [];
        foreach ($this->blogpostRepository->findLatest() as $post) {
            $latestPosts[] = $this->blogpostMapper->fromModel($post);
        }

        return array_merge($paramBag, [
            'latestPosts'    => $latestPosts,
            'socialChannels' => (new SocialChannel\Listing())->getObjects(),
        ]);
    }

    #[Route(
        '/{slug}',
        requirements: [
            'slug'  => '[\w-]+',
        ],
    )]
    public function subAction(string $slug, Request $request): Response
    {
        $page = Page::getByPath('/' . $slug);

        if ($page instanceof Page) {
            return $this->render($page->getTemplate());
        }

        $blogpostByLegacySlug = $this->blogpostRepository->getByWordPressSlug($slug);

        // Redirect legacy WordPress slugs to Pimcore blogpost
        if ($blogpostByLegacySlug instanceof Blogpost) {
            return $this->redirect($blogpostByLegacySlug->getSlug(), Response::HTTP_MOVED_PERMANENTLY);
        }

        $blogpost = $this->blogpostRepository->getBySlug($slug);
        if ($blogpost instanceof Blogpost) {
            return $this->blogpostAction($slug, $request, $blogpost);
        }

        return $this->notFoundAction($request);
    }

    #[Route(
        name: 'blogpost-detail',
    )]
    public function blogpostAction(string $slug, Request $request, ?Blogpost $blogpost): Response
    {
        if (!$blogpost instanceof Blogpost) {
            $blogpost = $this->blogpostRepository->getBySlug($slug);
        }

        $paramBag = $this->getAllParameters($request);

        $paramBag = array_merge($paramBag, [
            'blogpost'    => $this->blogpostMapper->fromModel($blogpost),
            'commentForm' => $this->blogpostService->createOrHandleCommentForm($request),
        ]);

        return $this->render('content/blogpost/blogpost.html.twig', $paramBag);
    }

    public function notFoundAction(Request $request): Response
    {
        $paramBag = $this->getAllParameters($request);
        $paramBag['headTitle'] = '404 - Seite nicht gefunden';

        $content = $this->renderView('error/404.html.twig', $paramBag);

        return new Response($content, Response::HTTP_NOT_FOUND);
    }

    /**
     * Forwards the request to admin login.
     */
    public function loginAction(): Response
    {
        return $this->forward(LoginController::class.'::loginCheckAction');
    }
}
