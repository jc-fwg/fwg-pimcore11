<?php

declare(strict_types=1);

namespace App\Controller;

use App\Adapter\App\Database\Doctrine\Repository\BlogpostRepository;
use App\Constant\FolderConstants;
use App\Mapper\BlogpostMapper;
use Pimcore\Bundle\AdminBundle\Controller\Admin\LoginController;
use Pimcore\Model\Asset;
use Pimcore\Model\DataObject\SocialChannel;
use Symfony\Bridge\Twig\Attribute\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use function count;

class DefaultController extends BaseController
{
    public function __construct(
        private readonly BlogpostRepository $blogpostRepository,
        private readonly BlogpostMapper $blogpostMapper,
    ) {
    }

    #[Template('content/home.html.twig')]
    public function defaultAction(Request $request,
    ): array {
        $paramBag = $this->getAllParameters($request);

        // Get random hero image
        $heroImages            = null;
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

    /**
     * Forwards the request to admin login.
     */
    public function loginAction(): Response
    {
        return $this->forward(LoginController::class.'::loginCheckAction');
    }
}
