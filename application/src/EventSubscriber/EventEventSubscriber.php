<?php

declare(strict_types=1);

namespace App\EventSubscriber;

use App\Adapter\App\Database\Doctrine\Repository\CustomerRepository;
use App\Adapter\App\Database\Doctrine\Repository\EventRepository;
use App\Adapter\App\Database\Doctrine\Repository\LocationRepository;
use App\Constant\FolderConstants;
use App\Service\EventService;
use App\Service\RedaxoSlugService;
use Pimcore\Model\DataObject\Service;
use Pimcore\Event\DataObjectEvents;
use Pimcore\Event\Model\DataObjectEvent;
use Pimcore\Model\DataObject;
use Pimcore\Model\Version;

class EventEventSubscriber extends AbstractEventSubscriber
{
    public const string ARGUMENT_PREVENT_EVENT_UPDATE_KEY = 'preventUpdateKey';

    public function __construct(
        private readonly EventRepository $eventRepository,
        private readonly EventService $eventService,
        private readonly CustomerRepository $customerRepository,
        private readonly LocationRepository $locationRepository,
    )
    {
    }

    /** @codeCoverageIgnore  */
    public static function getSubscribedEvents(): array
    {
        return [
            DataObjectEvents::POST_ADD => [
                ['updateSlug', 0],
            ],
            DataObjectEvents::PRE_UPDATE => [
                ['setParentByPublishedState', 0],
                ['updateKey', 0],
                ['addCustomer', 10],
                ['addLocation', 10],
            ],
            DataObjectEvents::POST_UPDATE => [
                ['updateSlug', 0],
            ],
        ];
    }

    public function updateKey(DataObjectEvent $event): void
    {
        $object = $event->getObject();
        if (
            !$object instanceof DataObject\Event
            || $event->hasArgument(self::IS_AUTO_SAVE) === true
            || (
                $event->hasArgument(self::ARGUMENT_PREVENT_EVENT_UPDATE_KEY) === true
                && $event->getArgument(self::ARGUMENT_PREVENT_EVENT_UPDATE_KEY) === true
            )
        )
        {
            return;
        }

        $key = '';

        $customer = DataObject\Customer::getById((string) $object->getCustomer());
        $key = ($customer instanceof DataObject\Customer) ? sprintf('%s ', $customer->getName()) ?? $customer->getKey() : $key;

        $title = (string) $object->getTitle();
        $key = ($title !== '') ? sprintf('%s %s', $key, $title) : $key;

        $location = DataObject\Location::getById((string) $object->getLocation());
        $key = ($location instanceof DataObject\Location) ? sprintf('%s, %s', $key, $location->getName() ?? $location->getKey()) : $key;

        if ($key === '') {
            return;
        }

        $object->setKey(Service::getValidKey($key, DataObject\AbstractObject::OBJECT_TYPE_OBJECT));

        $uniqueKey = Service::getUniqueKey($object);
        $object->setKey($uniqueKey);
    }

    public function addCustomer(DataObjectEvent $event): void
    {
        $object = $event->getObject();

        if (
            !$object instanceof DataObject\Event
            || $event->hasArgument(self::IS_AUTO_SAVE) === true
        ) {
            return;
        }

        $customerName = trim((string) $object->getCustomerNew());
        $object->setCustomerNew(null);

        if ($customerName === '') {
            return;
        }

        $customer = $this->customerRepository->findOneByName($customerName);

        if ($customer instanceof DataObject\Customer) {
            $object->setCustomer((string) $customer->getId());
            return;
        }

        $parent = DataObject\Service::createFolderByPath(FolderConstants::OBJECT_EVENTS_CUSTOMER);

        $customer = new DataObject\Customer();
        $customer->setParent($parent);
        $customer->setKey(DataObject\Service::getValidKey($customerName, DataObject\AbstractObject::OBJECT_TYPE_OBJECT));
        $customer->setPublished(true);

        $this->customerRepository->persist($customer);

        $object->setCustomer((string) $customer->getId());
    }

    public function addLocation(DataObjectEvent $event): void
    {
        $object = $event->getObject();

        if (
            !$object instanceof DataObject\Event
            || $event->hasArgument(self::IS_AUTO_SAVE) === true
        ) {
            return;
        }

        $locationName = trim((string) $object->getLocationNew());
        $object->setLocationNew(null);

        if ($locationName === '') {
            return;
        }

        $location = $this->locationRepository->findOneByName($locationName);

        if ($location instanceof DataObject\Location) {
            $object->setLocation((string) $location->getId());
            return;
        }

        $parent = DataObject\Service::createFolderByPath(FolderConstants::OBJECT_EVENTS_LOCATIONS);

        $location = new DataObject\Location();
        $location->setParent($parent);
        $location->setKey(DataObject\Service::getValidKey($locationName, DataObject\AbstractObject::OBJECT_TYPE_OBJECT));
        $location->setPublished(true);

        $this->locationRepository->persist($location);

        $object->setLocation((string) $location->getId());
    }

    public function setParentByPublishedState(DataObjectEvent $event): void
    {
        $object = $event->getObject();

        if (!$object instanceof DataObject\Event) {
            return;
        }

        $parentPublished = DataObject\Service::createFolderByPath(FolderConstants::OBJECT_EVENTS_EVENTS);
        $parentUnpublished = DataObject\Service::createFolderByPath(FolderConstants::OBJECT_EVENTS_EVENTS_INACTIVE);

        $parent = ($object->isPublished()) ? $parentPublished : $parentUnpublished;

        if ($parent->getId() === $object->getParentId()) {
            return;
        }

        $object->setParent($parent);
    }

    public function updateSlug(DataObjectEvent $event): void
    {
        $object = $event->getObject();

        if (!$object instanceof DataObject\Event) {
            return;
        }

        $this->eventService->generateAndSetSlug($object);

        Version::disable();
        $this->eventRepository->persist($object);
        Version::enable();
    }
}
