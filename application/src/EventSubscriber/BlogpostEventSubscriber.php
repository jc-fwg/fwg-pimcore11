<?php

declare(strict_types=1);

namespace App\EventSubscriber;

use App\Service\BlogpostService;
use Pimcore\Event\DataObjectEvents;
use Pimcore\Event\Model\DataObjectEvent;
use Pimcore\Model\DataObject;
use Pimcore\Model\Element\ValidationException;

class BlogpostEventSubscriber extends AbstractEventSubscriber
{
    public function __construct(
        private readonly BlogpostService $blogpostService,
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
                ['setAuthorTagsAtActivity']
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

        $authorTags = [];
        $blogpostAuthors = $object->getAuthors() ?? [];
        $authorTagsFromLastVersion = [];
        $activityTags = $activity->getTags() ?? [];

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
            $lastVersion = end($versions);
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
                if (in_array($tag, $authorTagsFromLastVersion) === true) {
                    unset($activityTags[$k]);
                }
            }
        }

        $activity->setTags(array_unique(array_merge($activityTags, $authorTags)));

        $activity->save();
    }
}
