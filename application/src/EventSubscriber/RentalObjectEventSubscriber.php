<?php

declare(strict_types=1);

namespace App\EventSubscriber;

use App\Adapter\App\Database\Doctrine\Repository\ManufacturerRepository;
use App\Adapter\App\Database\Doctrine\Repository\RentalObjectRepository;
use App\Constant\FolderConstants;
use App\Service\RentalService;
use Pimcore\Model\DataObject\Service;
use Pimcore\Event\DataObjectEvents;
use Pimcore\Event\Model\DataObjectEvent;
use Pimcore\Model\DataObject;
use Pimcore\Model\Version;

class RentalObjectEventSubscriber extends AbstractEventSubscriber
{
    public const string ARGUMENT_PREVENT_EVENT_UPDATE_KEY = 'preventUpdateKey';

    public function __construct(
        private readonly ManufacturerRepository $manufacturerRepository,
        private readonly RentalObjectRepository $rentalObjectRepository,
        private readonly RentalService $rentalService,
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
                ['addManufacturer', 10],
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
            !$object instanceof DataObject\RentalObject
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

        $manufacturer = DataObject\Manufacturer::getById((string) $object->getManufacturer());
        $key = ($manufacturer instanceof DataObject\Manufacturer) ? sprintf('%s ', $manufacturer->getName()) ?? $manufacturer->getKey() : $key;

        $title = (string) $object->getTitle();
        $key = ($title !== '') ? sprintf('%s %s', $key, $title) : $key;

        if ($key === '') {
            return;
        }

        $object->setKey(Service::getValidKey($key, DataObject\AbstractObject::OBJECT_TYPE_OBJECT));

        $uniqueKey = Service::getUniqueKey($object);
        $object->setKey($uniqueKey);
    }

    public function addManufacturer(DataObjectEvent $event): void
    {
        $object = $event->getObject();

        if (
            !$object instanceof DataObject\RentalObject
            || $event->hasArgument(self::IS_AUTO_SAVE) === true
        ) {
            return;
        }

        $manufacturerName = trim((string) $object->getManufacturerNew());
        $object->setManufacturerNew(null);

        if ($manufacturerName === '') {
            return;
        }

        $manufacturer = $this->manufacturerRepository->findOneByName($manufacturerName);

        if ($manufacturer instanceof DataObject\Manufacturer) {
            $object->setManufacturer((string) $manufacturer->getId());
            return;
        }

        $parent = DataObject\Service::createFolderByPath(FolderConstants::OBJECT_MATERIAL_MANUFACTURERS);

        $manufacturer = new DataObject\Manufacturer();
        $manufacturer->setParent($parent);
        $manufacturer->setKey(DataObject\Service::getValidKey($manufacturerName, DataObject\AbstractObject::OBJECT_TYPE_OBJECT));
        $manufacturer->setPublished(true);

        $this->manufacturerRepository->persist($manufacturer);

        $object->setManufacturer((string) $manufacturer->getId());
    }

    public function setParentByPublishedState(DataObjectEvent $event): void
    {
        $object = $event->getObject();

        if (!$object instanceof DataObject\RentalObject) {
            return;
        }

        $parentPublished = DataObject\Service::createFolderByPath(FolderConstants::OBJECT_MATERIAL_MATERIAL);
        $parentUnpublished = DataObject\Service::createFolderByPath(FolderConstants::OBJECT_MATERIAL_MATERIAL_INACTIVE);

        $parent = ($object->isPublished()) ? $parentPublished : $parentUnpublished;

        if ($parent->getId() === $object->getParentId()) {
            return;
        }

        $object->setParent($parent);
    }

    public function updateSlug(DataObjectEvent $event): void
    {
        $object = $event->getObject();

        if (!$object instanceof DataObject\RentalObject) {
            return;
        }

        $this->rentalService->generateAndSetSlug($object);

        Version::disable();
        $this->rentalObjectRepository->persist($object);
        Version::enable();
    }
}
