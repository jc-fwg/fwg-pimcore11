<?php

namespace App\Controller;

use App\Service\EventService;
use App\Service\RentalService;
use Pimcore\Bundle\AdminBundle\Controller\Admin\LoginController;
use Pimcore\Controller\FrontendController;
use Pimcore\Model\Asset;
use Pimcore\Model\Asset\Listing;
use Symfony\Bridge\Twig\Attribute\Template;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class DefaultController extends FrontendController
{
    #[Template('content/cms/start.html.twig')]
    #[Route('/', options: ['sitemap' => true])]
    public function defaultAction(
        EventService $eventService,
        RentalService $rentalService
    ): array
    {
        return [
            'events' => $eventService->getEventsByEventCategoryOrderedByHistory(limit: 4),
            'rentalObjects' => $rentalService->getRentalObjects(limit: 4),
            'hideTeaser' => true,
        ];
    }

    #[Template('content/error/error.html.twig')]
    public function errorAction(Request $request): array
    {
        return [
            'statusCode' => $request->attributes->get('exception')?->getStatusCode() ?? 500,
        ];
    }

    #[Template('layouts/includes/footer.html.twig')]
    public function footerAction(Request $request): array
    {
        return [];
    }

    #[Template('layouts/includes/map.html.twig')]
    public function mapAction(Request $request): array
    {
        return [];
    }

    #[Template('content/cms/1-column.html.twig')]
    public function cmsOneColumnAction(Request $request): array
    {
        return [];
    }

    #[Template('content/cms/2-columns.html.twig')]
    public function cmsTwoColumnsAction(Request $request): array
    {
        return [];
    }

    #[Template('content/cms/services.html.twig')]
    public function servicesAction(Request $request): array
    {
        return [];
    }

    #[Template('content/cms/contact.html.twig')]
    public function contactAction(Request $request): array
    {
        return [];
    }

    #[Route('/datenschutz-impressum.html')]
    #[Route('/nachhaltigkeit.html')]
    #[Route('/kontakt.html')]
    #[Route(
        '/leistungen/{slug}',
        requirements: ['slug' => '.+.html'],
        priority: 10
    )]
    public function redaxoCamsRedirectsAction(Request $request): RedirectResponse
    {
        $redirectUrl = str_replace('.html', '', $request->getRequestUri());

        return $this->redirect($redirectUrl, Response::HTTP_MOVED_PERMANENTLY);
    }

    #[Route('/media/{filename}', priority: 100)]
    public function mediaRedirectAction(string $filename): RedirectResponse
    {
        $list = new Listing();
        $list->setCondition("filename = ?", [$filename]);
        $asset = $list->current();

        if ($asset instanceof Asset) {
            return $this->redirect($asset->getFullPath(), Response::HTTP_MOVED_PERMANENTLY);
        }
    }

    /**
     * Forwards the request to admin login
     */
    public function loginAction(): Response
    {
        return $this->forward(LoginController::class.'::loginCheckAction');
    }
}
