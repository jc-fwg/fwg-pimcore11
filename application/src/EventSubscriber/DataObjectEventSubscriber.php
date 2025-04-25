<?php

declare(strict_types=1);

namespace App\EventSubscriber;

use App\Service\DataObjectService;
use Pimcore\Event\DataObjectEvents;
use Pimcore\Event\Model\DataObjectEvent;
use Pimcore\Model\DataObject;
use Pimcore\Tool;

class DataObjectEventSubscriber extends AbstractEventSubscriber
{
    public function __construct(
        private readonly DataObjectService $dataObjectService,
    )
    {
    }

    /** @codeCoverageIgnore  */
    public static function getSubscribedEvents(): array
    {
        return [
            DataObjectEvents::PRE_ADD => [
                ['initialNameByKey', 0],
            ],
            DataObjectEvents::POST_DELETE => [
                ['moveAssetsFolderToTrash', 0],
            ],
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

        $defaultLanguage = Tool::getDefaultLanguage();

        $object->setName($object->getKey(), $defaultLanguage);
    }

    /**
     * @throws \Pimcore\Model\Element\DuplicateFullPathException
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
