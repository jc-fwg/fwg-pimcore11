<?php

declare(strict_types=1);

namespace App\EventSubscriber;

use App\OpenAI\Service\OpenAIService;
use App\Service\BlogpostService;
use Pimcore\Event\DataObjectEvents;
use Pimcore\Event\Model\DataObjectEvent;
use Pimcore\Model\DataObject;

use function count;
use function in_array;

class BlogpostEventSubscriber extends AbstractEventSubscriber
{
    public function __construct(
        private readonly BlogpostService $blogpostService,
        private readonly OpenAIService $openAIService
    ) {
    }

    /** @codeCoverageIgnore */
    public static function getSubscribedEvents(): array
    {
        return [
            DataObjectEvents::PRE_ADD => [
                ['setSlug'],
            ],
            DataObjectEvents::PRE_UPDATE => [
                ['setSlug'],
                ['setAuthorTagsAtActivity'],
                ['setSeoData'],
                ['checkDataQuality'],
            ],
        ];
    }

    public function setSeoData(DataObjectEvent $event): void
    {
        return; // Disable AI SEO generation for Blogposts
        $object = $event->getObject();

        if (!$object instanceof DataObject\Blogpost) {
            return;
        }

        if ((string) $object->getFocusKeyword() === '') {
            return;
        }

        if (
            strlen((string) $object->getMetaTitle()) > 10
            && strlen((string) $object->getMetaDescription()) > 10
        ) {
            return;
        }

        $openAiResponse = $this->openAIService->blogpost()->response($object->getFocusKeyword());

        if (strlen((string) $object->getMetaTitle()) <= 10 && isset($openAiResponse['metaTitle'])) {
            $object->setMetaTitle($openAiResponse['metaTitle']);
        }

        if (strlen((string) $object->getMetaDescription()) <= 10 && isset($openAiResponse['metaDescription'])) {
            $object->setMetaDescription($openAiResponse['metaDescription']);
        }
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

    public function setAuthorTagsAtActivity(DataObjectEvent $event): void
    {
        if ($this->isAutoSave($event)) {
            return;
        }

        $object = $event->getObject();

        if (!$object instanceof DataObject\Blogpost) {
            return;
        }

        $activity = $object->getActivity();
        if (empty($activity) === true) {
            return;
        }

        $authorTags                = [];
        $blogpostAuthors           = $object->getAuthors() ?? [];
        $authorTagsFromLastVersion = [];
        $activityTags              = $activity->getTags() ?? [];

        foreach ($blogpostAuthors as $authorId) {
            $author = DataObject\Author::getById($authorId);

            if (!$author instanceof DataObject\Author) {
                continue;
            }

            $authorTag = $author->getTag();

            if (!$authorTag instanceof DataObject\Tag) {
                continue;
            }

            $authorTags[] = $authorTag;
        }

        // Fetch old authors from last version and remove relations from activity
        $versions = $object->getVersions();
        if (count($versions) > 0) {
            $lastVersion     = end($versions);
            $blogpostVersion = $lastVersion->getData();

            $oldAuthors = $blogpostVersion?->getAuthors() ?? [];

            foreach ($oldAuthors as $oldAuthor) {
                $author = DataObject\Author::getById($oldAuthor);

                if (!$author instanceof DataObject\Author) {
                    continue;
                }

                $authorTagsFromLastVersion[] = $author->getTag();
            }

            foreach ($activityTags as $k => $tag) {
                if (in_array($tag, $authorTagsFromLastVersion, true) === true) {
                    unset($activityTags[$k]);
                }
            }
        }

        $activity->setTags(array_unique(array_merge($activityTags, $authorTags)));

        $activity->save();
    }

    /**
     * @throws \Exception
     */
    public function checkDataQuality(DataObjectEvent $event): void
    {
        if ($this->isAutoSave($event)) {
            return;
        }

        $object = $event->getObject();

        if (!$object instanceof DataObject\Blogpost) {
            return;
        }

        if ($this->blogpostService->hasDataQualityIssues($object) === false) {
            return;
        }

        $object->setPublished(false);
    }
}
