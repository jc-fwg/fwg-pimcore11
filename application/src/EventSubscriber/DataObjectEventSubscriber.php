<?php

declare(strict_types=1);

namespace App\EventSubscriber;

use Pimcore\Event\DataObjectEvents;
use Pimcore\Event\Model\DataObjectEvent;
use Pimcore\Model\DataObject;
use Pimcore\Tool;

class DataObjectEventSubscriber extends AbstractEventSubscriber
{
    /** @codeCoverageIgnore  */
    public static function getSubscribedEvents(): array
    {
        return [
            DataObjectEvents::PRE_ADD => [
                ['initialNameByKey', 0],
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
}
