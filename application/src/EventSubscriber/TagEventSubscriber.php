<?php

declare(strict_types=1);

namespace App\EventSubscriber;

use App\Service\TagService;
use Pimcore\Event\DataObjectEvents;
use Pimcore\Event\Model\DataObjectEvent;
use Pimcore\Model\DataObject;

class TagEventSubscriber extends AbstractEventSubscriber
{
    public function __construct(
        private readonly TagService $tagService,
    ) {
    }

    /** @codeCoverageIgnore  */
    public static function getSubscribedEvents(): array
    {
        return [
            DataObjectEvents::PRE_ADD => [
                ['setSlug'],
            ],
            DataObjectEvents::PRE_UPDATE => [
                ['setSlug'],
            ],
        ];
    }

    public function setSlug(DataObjectEvent $event): void
    {
        $object = $event->getObject();

        if (
            !$object instanceof DataObject\Tag
            && !$object instanceof DataObject\TagCategory
        ) {
            return;
        }

        if (empty($object->getSlug()) === false) {
            return;
        }

        $this->tagService->setSlug($object);
    }
}
