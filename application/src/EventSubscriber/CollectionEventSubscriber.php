<?php

declare(strict_types=1);

namespace App\EventSubscriber;

use App\OpenAI\Service\OpenAIService;
use Pimcore\Event\DataObjectEvents;
use Pimcore\Event\Model\DataObjectEvent;
use Pimcore\Model\DataObject;

use function strlen;

class CollectionEventSubscriber extends AbstractEventSubscriber
{
    public function __construct(
        private readonly OpenAIService $openAIService,
    ) {
    }

    /** @codeCoverageIgnore  */
    public static function getSubscribedEvents(): array
    {
        return [
            DataObjectEvents::PRE_UPDATE => [
                ['setOpenAiData'],
            ],
        ];
    }

    public function setOpenAiData(DataObjectEvent $event): void
    {
        $object = $event->getObject();

        if (!$object instanceof DataObject\Collection) {
            return;
        }

        if ((string) $object->getTitle() === '') {
            return;
        }

        $description = strip_tags((string) $object->getDescription());

        if (
            strlen($description) > 10
            && strlen((string) $object->getMetaTitle()) > 10
            && strlen((string) $object->getMetaDescription()) > 10
        ) {
            return;
        }

        $openAiResponse = $this->openAIService->collection()->response($object->getTitle());

        if (strlen($description) <= 10 && isset($openAiResponse['description'])) {
            $object->setDescription($openAiResponse['description']);
        }

        if (strlen((string) $object->getMetaTitle()) > 10 && isset($openAiResponse['metaTitle'])) {
            $object->setMetaTitle($openAiResponse['metaTitle']);
        }

        if (strlen((string) $object->getMetaDescription()) > 10 && isset($openAiResponse['metaDescription'])) {
            $object->setMetaDescription($openAiResponse['metaDescription']);
        }
    }
}
