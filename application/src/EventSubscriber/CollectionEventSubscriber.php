<?php

declare(strict_types=1);

namespace App\EventSubscriber;

use App\OpenAI\Service\OpenAIService;
use App\Service\CollectionService;
use Pimcore\Event\DataObjectEvents;
use Pimcore\Event\Model\DataObjectEvent;
use Pimcore\Model\Asset\Image;
use Pimcore\Model\DataObject;

use function strlen;

class CollectionEventSubscriber extends AbstractEventSubscriber
{
    public function __construct(
        private readonly OpenAIService $openAIService,
        private readonly CollectionService $collectionService,
    ) {
    }

    /** @codeCoverageIgnore */
    public static function getSubscribedEvents(): array
    {
        return [
            DataObjectEvents::PRE_ADD => [
                ['setTitleAndSlugByKey', 20],
            ],

            DataObjectEvents::PRE_UPDATE => [
                ['setSeoAndDescriptionData', 20],
                ['setTeaserImageIfMissing', 10],
                ['generateSocialPreviewThumbnails', 5],
            ],
        ];
    }

    public function setTitleAndSlugByKey(DataObjectEvent $event): void
    {
        $object = $event->getObject();

        if (!$object instanceof DataObject\Collection) {
            return;
        }

        $this->collectionService->setTitleAndSlugByKey($object);
    }

    public function setSeoAndDescriptionData(DataObjectEvent $event): void
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
            && strlen((string) $object->getOgDescription()) > 10
        ) {
            return;
        }

        $prompt = 'Generiere mir bitte SEO freundliche description, meta title, meta description und eine natürlich wirkende Open Graph description (og:description) für meine Listenseite mit folgendem Titel: '.$object->getTitle();

        $openAiResponse = $this->openAIService->collectionChat()->response($prompt);

        if (strlen($description) <= 10 && isset($openAiResponse['description'])) {
            $object->setDescription($openAiResponse['description']);
        }

        if (strlen((string) $object->getMetaTitle()) <= 10 && isset($openAiResponse['metaTitle'])) {
            $object->setMetaTitle($openAiResponse['metaTitle']);
        }

        if (strlen((string) $object->getMetaDescription()) <= 10 && isset($openAiResponse['metaDescription'])) {
            $object->setMetaDescription($openAiResponse['metaDescription']);
        }

        if (strlen((string) $object->getOgDescription()) <= 10 && isset($openAiResponse['ogDescription'])) {
            $object->setOgDescription($openAiResponse['ogDescription']);
        }
    }

    public function setTeaserImageIfMissing(DataObjectEvent $event): void
    {
        if ($this->isAutoSave($event)) {
            return;
        }

        $object = $event->getObject();

        if (!$object instanceof DataObject\Collection) {
            return;
        }

        $imageTeaser = $object->getImageTeaser();

        if ($imageTeaser instanceof Image) {
            return;
        }

        $this->collectionService->setTeaserImageFromBlogposts($object);
    }

    public function generateSocialPreviewThumbnails(DataObjectEvent $event): void
    {
        if ($this->isAutoSave($event)) {
            return;
        }

        $object = $event->getObject();

        if (!$object instanceof DataObject\Collection) {
            return;
        }

        $this->collectionService->generateSocialPreviewThumbnails($object);
    }
}
