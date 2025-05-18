<?php

declare(strict_types=1);

namespace App\Controller;

use App\Adapter\App\Database\Doctrine\Repository\BlogpostRepository;
use App\Mapper\BlogpostMapper;
use Pimcore\Bundle\AdminBundle\Controller\Admin\LoginController;
use Pimcore\Model\DataObject\SocialChannel;
use Symfony\Bridge\Twig\Attribute\Template;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends BaseController
{
    public function __construct(
        private readonly BlogpostRepository $blogpostRepository,
        private readonly BlogpostMapper     $blogpostMapper,
    )
    {
    }

    #[Template('content/home.html.twig')]
    public function defaultAction(
    ): array
    {
        $latestPosts = [];
        foreach ($this->blogpostRepository->findLatest() as $post) {
            $latestPosts[] = $this->blogpostMapper->fromModel($post);
        }

        return [
            'latestPosts' => $latestPosts,
            'socialChannels' => (new SocialChannel\Listing())->getObjects(),
        ];
    }

    /**
     * Forwards the request to admin login
     */
    public function loginAction(): Response
    {
        return $this->forward(LoginController::class.'::loginCheckAction');
    }
}
