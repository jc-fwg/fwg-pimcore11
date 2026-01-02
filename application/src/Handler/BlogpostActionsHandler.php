<?php

declare(strict_types=1);

namespace App\Handler;

use App\Service\WordpressCrawlerService;
use Pimcore\Model\DataObject;
use Pimcore\Model\DataObject\Blogpost;
use Pimcore\Model\Element\ValidationException;

use function strlen;

class BlogpostActionsHandler
{
    public const string ACTION_AI_CITY_SPORT_FACTS_UPDATE         = 'aiCitySpotFactsUpdate';
    public const string ACTION_CRAWL_WORDPRESS_CITY_TRIP_CONTENTS = 'crawlWordpressCityTripContents';
    public const string ACTION_CRAWL_LEGACY_TOUR_CONTENTS         = 'crawlLegacyTourContents';

    public function __construct(
        private readonly WordpressCrawlerService $wordpressCrawlerService,
    ) {
    }

    /**
     * @throws ValidationException
     */
    public function importCityTripContents(Blogpost $blogpost): void
    {
        $wordpressSlug = $blogpost->getWordpressSlug() ?? '';

        if (strlen($wordpressSlug) <= 5) {
            throw new ValidationException('No valid WordPress slug set for crawling.');
        }

        $contents = $this->wordpressCrawlerService->crawlCityTrip('https://frei-weg.com/'.$wordpressSlug);

        $blogpost->setTitle($contents['title'] ?? '');
        $blogpost->setPreviewText($contents['introduction'] ?? '');

        $fieldCollection = new DataObject\Fieldcollection();
        foreach ($contents['sections'] as $section) {
            $fieldCollectionItem = new DataObject\Fieldcollection\Data\ContentCitySpot();
            $fieldCollectionItem->setTitle($section['headline'] ?? '');
            $fieldCollectionItem->setConclusion($section['text'] ?? '');

            $links = [];
            foreach ($section['links'] ?? [] as $link) {
                $links[] = [
                    'linkType'  => new DataObject\Data\BlockElement('linkType', 'select', DataObject\SelectOptions\LinkType::website->value),
                    'linkTitle' => new DataObject\Data\BlockElement('linkTitle', 'input', $link['label'] ?? ''),
                    'linkUrl'   => new DataObject\Data\BlockElement('linkUrl', 'input', $link['url'] ?? ''),
                ];
            }

            $fieldCollectionItem->setLinks($links);

            $fieldCollection->add($fieldCollectionItem);
        }

        $blogpost->setContent($fieldCollection);
    }

    /**
     * @throws ValidationException
     */
    public function importLegacyTourContents(Blogpost $blogpost): void
    {
        $wordpressSlug = $blogpost->getWordpressSlug() ?? '';

        if (strlen($wordpressSlug) <= 5) {
            throw new ValidationException('No valid WordPress slug set for crawling.');
        }

        $contents = $this->wordpressCrawlerService->crawlLegacyTour('https://frei-weg.com/'.$wordpressSlug);

        $blogpost->setTitle($contents['title'] ?? '');
        $blogpost->setPreviewText($contents['introduction'] ?? '');

        $fieldCollection = new DataObject\Fieldcollection();
        foreach ($contents['sections'] as $section) {

            $headline = $section['headline'] ?? '';
            $fieldCollectionItem = match(true) {
                preg_match('/^Fazit/', $headline) === 1 => new DataObject\Fieldcollection\Data\ContentWysiwyg(),
                default => new DataObject\Fieldcollection\Data\ContentGallery()
            };

            // WYSIWYG Content Field Collection does not have title field so we need to set the headline as text
            switch ($fieldCollectionItem::class) {
                case DataObject\Fieldcollection\Data\ContentWysiwyg::class:
                    $text = sprintf('<h3>%s</h3>%s', $headline, $section['text'] ?? '');
                    $fieldCollectionItem->setWysiwyg($text);
                    break;
                default:
                    $fieldCollectionItem->setTitle($section['headline'] ?? '');
                    $fieldCollectionItem->setText($section['text'] ?? '');
            };

            $fieldCollection->add($fieldCollectionItem);
        }

        $blogpost->setContent($fieldCollection);
    }
}
