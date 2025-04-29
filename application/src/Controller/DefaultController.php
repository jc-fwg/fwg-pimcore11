<?php

declare(strict_types=1);

namespace App\Controller;

use Pimcore\Bundle\AdminBundle\Controller\Admin\LoginController;
use Pimcore\Model\DataObject\SocialChannel;
use Symfony\Bridge\Twig\Attribute\Template;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends BaseController
{
    #[Template('content/home.html.twig')]
    public function defaultAction(
    ): array
    {
        return [
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
