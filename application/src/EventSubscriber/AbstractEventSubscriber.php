<?php

declare(strict_types=1);

namespace App\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;

abstract class AbstractEventSubscriber implements EventSubscriberInterface
{
    public const IS_AUTO_SAVE = 'isAutoSave';
}
