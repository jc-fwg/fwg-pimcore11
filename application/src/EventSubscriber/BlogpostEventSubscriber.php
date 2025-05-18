<?php

declare(strict_types=1);

namespace App\EventSubscriber;

use App\Service\BlogpostService;
use Pimcore\Event\DataObjectEvents;
use Pimcore\Event\Model\DataObjectEvent;
use Pimcore\Model\DataObject;

class BlogpostEventSubscriber extends AbstractEventSubscriber
{
    public function __construct(
        private readonly BlogpostService $blogpostService,
    )
    {
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

        if (!$object instanceof DataObject\Blogpost) {
            return;
        }

        if (empty($object->getSlug()) === false) {
            return;
        }

        $this->blogpostService->setSlug($object);
    }
}
