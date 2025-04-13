<?php

declare(strict_types=1);

namespace App\Service;

use App\Adapter\App\Database\Doctrine\Repository\EventCategoryRepository;
use App\Adapter\App\Database\Doctrine\Repository\EventRepository;
use App\Constant\WebsiteSettingConstants;
use App\Dto\EventDetailsDto;
use Pimcore\Bundle\UuidBundle\Model\Tool\UUID;
use Pimcore\Model\Asset\Image;
use Pimcore\Model\DataObject\Customer;
use Pimcore\Model\DataObject\Data\Hotspotimage;
use Pimcore\Model\DataObject\Data\ImageGallery;
use Pimcore\Model\DataObject\Event;
use Pimcore\Model\DataObject\EventCategory;
use Pimcore\Model\DataObject\Location;
use Pimcore\Model\WebsiteSetting;
use Symfony\Component\String\Slugger\SluggerInterface;

class EventService
{
    public function __construct(
        private readonly EventRepository $eventRepository,
        private readonly EventCategoryRepository $eventCategoryRepository,
        private readonly SluggerInterface $slugger,
    )
    {
    }

    /**
     * @return EventDetailsDto[]
     */
    public function getEventsByEventCategoryOrderedByHistory(?EventCategory $eventCategory = null, ?int $limit = null): array
    {
        $events = $this->eventRepository->findAllWithoutRedaxoIdsOrderedByOoidDesc();
        $events = array_merge($events, $this->eventRepository->findAllWithRedaxoArticleSliceIdOrderedByRedaxoArticleSliceIdDesc());
        $events = array_merge($events, $this->eventRepository->findAllWithRedaxoIdOrderedByDateStartDesc());

        $data = [];

        /** @var Event $event */
        foreach ($events as $event) {
            if (
                $eventCategory instanceof EventCategory
                && (int) $event->getEventCategory() !== $eventCategory->getId()
            ) {
                continue;
            }

            $data[] = $this->getEventDetails($event);
        }

        return match (true) {
            $limit > 0 => array_slice($data, 0, $limit),
            $limit === null => $data,
        };
    }

    public function generateAndSetSlug(Event $event): void
    {
        $slug = [];

        $customer = Customer::getById($event->getCustomer());
        $location = Location::getById($event->getLocation());

        if ($customer instanceof Customer) {
            $slug[] = $customer->getName();
        }

        $slug[] = $event->getTitle();

        if ($location instanceof Location) {
            $slug[] = $location->getName();
        }

        $slug = $this->slugger->slug(implode(' ', $slug))->toString();

        // Prevent slug duplication
        $eventSlugged = $this->eventRepository->findOneBySlug($slug, false);
        if (
            $eventSlugged instanceof Event
            && $eventSlugged->getId() !== $event->getId()
        ) {
            $slug = sprintf('%s-%s', $slug, $event->getId());
        }

        $event->setSlug($slug);
    }

    public function getEventDetails(Event $event): EventDetailsDto
    {
        $customer = Customer::getById($event->getCustomer());
        $location = Location::getById($event->getLocation());
        $eventCategory = EventCategory::getById($event->getEventCategory());

        // Title
        $title = [];
        if ($customer instanceof Customer) {
            $title[] = $customer->getName();
        }

        $eventTitle = $event->getTitle();
        $title[] =($location instanceof Location) ?
            sprintf('%s, %s', $eventTitle, $location->getName()) : $eventTitle;

        // Image: List
        $imageGalleryFirst = $event->getImageGallery()?->current();
        $imageList = ($imageGalleryFirst instanceof Hotspotimage) ?
            $imageGalleryFirst->getImage() : null;

        // Image : Teaser
        $imageTeaser = $event->getImageTeaser();
        $imageTeaser = ($imageTeaser instanceof Image) ?
            $imageTeaser : WebsiteSetting::getByName(WebsiteSettingConstants::ASSET_EVENT_DEFAULT_TEASER_IMAGE)?->getData();

        // Image: Gallery
        $imageGallery = [];
        $imagesGallery = $event->getImageGallery();
        if ($imagesGallery instanceof ImageGallery) {
            foreach ($imagesGallery as $item) {
                if ($item instanceof Hotspotimage) {
                    $imageGallery[] = $item->getImage();
                }
            }
        }

        return new EventDetailsDto(
            event: $event,
            eventCategory: $eventCategory,
            customer: $customer,
            location: $location,
            title: $title,
            imageList: $imageList,
            imageTeaser: $imageTeaser,
            imageGallery: $imageGallery,
            uuid: UUID::getByItem($event)->getUuid(),
        );
    }

    public function getEventCategoriesWithPublishedEvents()
    {
        return $this->eventCategoryRepository->getAllWithPublishedEvents();
    }
}
