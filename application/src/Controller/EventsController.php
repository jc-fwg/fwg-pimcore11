<?php

declare(strict_types=1);

namespace App\Controller;

use App\Dto\EventDetailsDto;
use App\Service\EventService;
use Pimcore\Model\DataObject\Event;
use Pimcore\Model\DataObject\EventCategory;
use Pimcore\Model\Document;
use Symfony\Bridge\Twig\Attribute\Template;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Attribute\Route;

class EventsController extends BaseController
{
    public function __construct(
        private readonly EventService $eventsService
    )
    {
    }

    /**
     * @return array{
     *     document: ?Document,
     *     eventCategories: EventCategory[],
     *     eventCategory: null,
     *     events: EventDetailsDto[]
     */
    #[Template('content/events/list.html.twig')]
    #[Route('/referenzen', name: 'events_list', options: ['sitemap' => true, 'section' => 'events'])]
    public function listAction(): array
    {
        return [
            'document' => Document::getByPath('/referenzen'),
            'eventCategories' => $this->eventsService->getEventCategoriesWithPublishedEvents(),
            'eventCategory' => null,
            'events' => $this->eventsService->getEventsByEventCategoryOrderedByHistory(),
        ];
    }

    /**
     * @return array{
     *     document: ?Document,
     *     eventCategories: EventCategory[],
     *     eventCategory: ?EventCategory,
     *     events: EventDetailsDto[]
     */
    #[Template('content/events/list.html.twig')]
    #[Route(
        '/referenzen/{slug}',
        name: 'events_list_category'
    )]
    public function listCategoryAction(string $slug): array
    {
        $eventCategory = EventCategory::getBySlug($slug, 1);

        if (
            !$eventCategory instanceof EventCategory
            && $this->editmode === false
        ) {
            throw new NotFoundHttpException('EventCategory not found');
        }

        return [
            'document' => Document::getByPath('/referenzen'),
            'eventCategories' => $this->eventsService->getEventCategoriesWithPublishedEvents(),
            'eventCategory' => $eventCategory,
            'events' => $this->eventsService->getEventsByEventCategoryOrderedByHistory($eventCategory),
        ];
    }

    #[Route(
        '/referenzen/{slug}',
        name: 'events_redaxo_eid',
        requirements: ['slug' => '.+eid\d+.html'],
        priority: 10
    )]
    public function eidAction(string $slug): RedirectResponse
    {
        $eid = preg_match('/eid(\d+)/', $slug, $matches) ? $matches[1] : null;

        $event = Event::getByRedaxoArticleSliceId($eid, 1);

        if ($event instanceof Event) {
            return $this->redirect('/referenz/' . $event->getSlug(), Response::HTTP_MOVED_PERMANENTLY);
        }
    }

    #[Route(
        '/referenzen/{slug}',
        name: 'events_redaxo_rid',
        requirements: ['slug' => '.+rid\d+.html'],
        priority: 10
    )]
    public function ridAction(string $slug): RedirectResponse
    {
        $rid = preg_match('/rid(\d+)/', $slug, $matches) ? $matches[1] : null;

        $event = Event::getByRedaxoId($rid, 1);

        if ($event instanceof Event) {
            return $this->redirect('/referenz/' . $event->getSlug(), Response::HTTP_MOVED_PERMANENTLY);
        }
    }

    /**
     * @return array{
     *     event: EventDetailsDto
     * }
     */
    #[Template('content/events/details.html.twig')]
    #[Route(
        '/referenz/{slug}',
        name: 'events_details',
        priority: 10
    )]
    public function detailsAction(string $slug): array
    {
        $event = Event::getBySlug($slug, 1);

        if (!$event instanceof Event) {
            throw new NotFoundHttpException('Event not found');
        }

        return [
            'event' => $this->eventsService->getEventDetails($event),
        ];
    }
}
