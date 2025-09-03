<?php

declare(strict_types=1);

namespace App\EventSubscriber;

use Pimcore\Event\Model\DataObjectEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

abstract class AbstractEventSubscriber implements EventSubscriberInterface
{
    public const string IS_AUTO_SAVE = 'isAutoSave';

    public function isAutoSave(DataObjectEvent $event): bool
    {
        return (
            $event->hasArgument(self::IS_AUTO_SAVE) === true
            && $event->getArgument(self::IS_AUTO_SAVE) === true
        );
    }
}

