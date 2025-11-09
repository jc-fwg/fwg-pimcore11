<?php

declare(strict_types=1);

namespace App\EventSubscriber;

use App\Dto\BlogpostDto;
use App\OpenAI\Service\OpenAIService;
use App\Service\BlogpostService;
use Exception;
use Pimcore\Event\DataObjectEvents;
use Pimcore\Event\Model\DataObjectEvent;
use Pimcore\Model\DataObject;
use Pimcore\Model\Element\ValidationException;
use Throwable;

use function count;
use function in_array;
use function sprintf;
use function strlen;

class BlogpostEventSubscriber extends AbstractEventSubscriber
{
    public function __construct(
        private readonly BlogpostService $blogpostService,
        private readonly OpenAIService $openAIService,
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
                ['generateSocialPreviewThumbnails'],
                ['checkDataQuality', 10],
            ],
        ];
    }

    /**
     * @throws Exception
     */
    public function setSeoData(DataObjectEvent $event): void
    {
        $object = $event->getObject();

        if (!$object instanceof DataObject\Blogpost) {
            return;
        }

        // Return on any data quality issues
        $dataQuality = $this->blogpostService->checkDataQuality($object);

        if (
            count($dataQuality[BlogpostDto::VALIDATION_GROUP_DATA_QUALITY_BASE_DATA]) > 0
            || count($dataQuality[BlogpostDto::VALIDATION_GROUP_DATA_QUALITY_CONTENT]) > 0
            || count($dataQuality[BlogpostDto::VALIDATION_GROUP_DATA_QUALITY_ASSETS_DOWNLOADS_LINKS]) > 0
        ) {
            return;
        }

        // Return if both meta title and description are already set
        if (strlen((string) $object->getMetaTitle()) > 5 && strlen((string) $object->getMetaDescription()) > 5) {
            return;
        }

        // Return if no focus keyword is set
        if ((string) $object->getFocusKeyword() === '') {
            return;
        }

        // Build prompt
        $prompt = $this->fetchSeoPrompt($object);

        try {
            $openAiResponse = $this->openAIService->blogpost()->response($prompt);
        } catch (Throwable $exception) {
            throw new ValidationException($exception->getMessage());
        }

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
     * @throws Exception
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

    public function generateSocialPreviewThumbnails(DataObjectEvent $event): void
    {
        if ($this->isAutoSave($event)) {
            return;
        }

        $object = $event->getObject();

        if (!$object instanceof DataObject\Blogpost) {
            return;
        }

        $this->blogpostService->generateSocialPreviewThumbnails($object);
    }

    private function fetchSeoPrompt(DataObject\Blogpost $blogpost): string
    {
        $prompt = 'Die Zielgruppe des Blogposts sind: Wanderer und Outdoor Sportler allgemein.';
        $prompt = sprintf(
            '%s Das Fokus Keyword lautet: "%s".',
            $prompt,
            $blogpost->getFocusKeyword()
        );
        $prompt = sprintf(
            '%s Der Titel des Blogposts lautet: "%s".',
            $prompt,
            $blogpost->getTitle()
        );
        $prompt = sprintf(
            '%s Die Einleitung des Blogposts lautet: "%s".',
            $prompt,
            strip_tags($blogpost->getPreviewText())
        );

        $content = $blogpost->getContent();

        /** @var ?string $contentHtml */
        $contentHtml = '';

        if ($content instanceof DataObject\Fieldcollection) {
            $items = $content->getItems();

            foreach ($items as $item) {
                if (!$item instanceof DataObject\Fieldcollection\Data\ContentWysiwyg) {
                    continue;
                }

                $contentHtml = sprintf(
                    '%s %s',
                    $contentHtml,
                    $item->getWysiwyg()
                );
            }
        }

        return sprintf(
            '%s Der Content des Blogposts als HTML lautet: "%s".',
            $prompt,
            $contentHtml
        );
    }
}
