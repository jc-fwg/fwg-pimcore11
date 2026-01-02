<?php

declare(strict_types=1);

namespace App\EventSubscriber;

use Pimcore\Event\DataObjectEvents;
use Pimcore\Event\Model\DataObjectEvent;
use Pimcore\Model\DataObject;

class ActivityEventSubscriber extends AbstractEventSubscriber
{
    /** @codeCoverageIgnore */
    public static function getSubscribedEvents(): array
    {
        return [
            DataObjectEvents::PRE_ADD => [
                ['setTitleByKey', 20],
            ],
        ];
    }

    public function setTitleByKey(DataObjectEvent $event): void
    {
        $object = $event->getObject();

        if (!$object instanceof DataObject\Activity) {
            return;
        }

        $object->setTitle($object->getKey());
    }
}
