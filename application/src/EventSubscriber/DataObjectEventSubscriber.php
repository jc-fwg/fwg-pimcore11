<?php

declare(strict_types=1);

namespace App\EventSubscriber;

use App\Service\DataObjectService;
use Exception;
use Pimcore\Event\DataObjectEvents;
use Pimcore\Event\Model\DataObjectEvent;
use Pimcore\Model\DataObject;
use Pimcore\Model\Element\DuplicateFullPathException;
use Pimcore\Tool;

class DataObjectEventSubscriber extends AbstractEventSubscriber
{
    public function __construct(
        private readonly DataObjectService $dataObjectService,
    ) {
    }

    /** @codeCoverageIgnore  */
    public static function getSubscribedEvents(): array
    {
        return [
            DataObjectEvents::PRE_ADD => [
                ['initialNameByKey', 10],
                ['setAssetsFolderByObjectKey', 5],
            ],
            DataObjectEvents::PRE_UPDATE => [
                ['setAssetsFolderByObjectKey', 0],
                ['setKeyByDateAndTitle', 0]
            ],
            DataObjectEvents::PRE_DELETE => [
                ['moveAssetsFolderToTrash', 0],
            ],
            DataObjectEvents::POST_ADD => [
                ['setKeyByDateAndTitle', 0],
            ]
        ];
    }

    public function initialNameByKey(DataObjectEvent $event): void
    {
        $object = $event->getObject();

        if (!$object instanceof DataObject) {
            return;
        }

        if ($object->getType() !== DataObject\AbstractObject::OBJECT_TYPE_OBJECT) {
            return;
        }

        if (method_exists($object, 'setName') === false) {
            return;
        }

        if (
            method_exists($object, 'getName') === true
            && empty($object->getName()) === false
        ) {
            return;
        }

        $defaultLanguage = Tool::getDefaultLanguage();

        $object->setName($object->getKey(), $defaultLanguage);
    }

    /**
     * @throws Exception
     */
    public function setAssetsFolderByObjectKey(DataObjectEvent $event): void
    {
        $object = $event->getObject();

        if (!$object instanceof DataObject) {
            return;
        }

        if (method_exists($object, 'getAssetsFolder') === false) {
            return;
        }

        $this->dataObjectService->setAssetsFolderByObjectKey($object);
    }

    /**
     * @throws DuplicateFullPathException
     */
    public function moveAssetsFolderToTrash(DataObjectEvent $event): void
    {
        $object = $event->getObject();

        if (!$object instanceof DataObject) {
            return;
        }

        $this->dataObjectService->moveAssetsFolderToTrash($object);
    }
}
