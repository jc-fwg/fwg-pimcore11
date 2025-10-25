<?php

declare(strict_types=1);

namespace App\EventSubscriber;

use Pimcore\Event\Model\DataObjectEvent;
use Pimcore\Model\DataObject\AbstractObject;
use Pimcore\Model\DataObject\Activity;
use Pimcore\Model\DataObject\Blogpost;
use Pimcore\Model\DataObject\Service;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

use function sprintf;

abstract class AbstractEventSubscriber implements EventSubscriberInterface
{
    public const string IS_AUTO_SAVE = 'isAutoSave';

    public function isAutoSave(DataObjectEvent $event): bool
    {
        return
            $event->hasArgument(self::IS_AUTO_SAVE) === true
            && $event->getArgument(self::IS_AUTO_SAVE) === true;
    }

    public function setKeyByDateAndTitle(DataObjectEvent $event): void
    {
        $object = $event->getObject();

        $date = match (true) {
            $object instanceof Blogpost => $object->getPublicationDate(),
            $object instanceof Activity => $object->getDate(),
            default                     => null,
        };

        if ($date === null) {
            return;
        }

        $title = $object->getTitle();

        if ($object->getKey() === null || $title === null) {
            return;
        }

        $key = sprintf('%s - %s', $date->format('Y-m-d'), $title);

        if ($object->getKey() === $key) {
            return;
        }

        $key = Service::getValidKey($key, AbstractObject::OBJECT_TYPE_OBJECT);
        $object->setKey($key);

        $object->save();
    }
}
