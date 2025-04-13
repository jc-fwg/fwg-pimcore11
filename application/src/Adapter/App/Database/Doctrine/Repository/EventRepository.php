<?php

declare(strict_types=1);

namespace App\Adapter\App\Database\Doctrine\Repository;

use Pimcore\Model\DataObject\Event;
use Pimcore\Model\DataObject\Event\Listing;
use Pimcore\Model\DataObject\RentalObject;

class EventRepository extends AbstractRepository
{
    public function findOneByRedaxoId(int $redaxoId, bool $hideUnpublished = true): ?Event
    {
        $listing = new Listing();
        $listing->setCondition(Event::FIELD_REDAXO_ID . ' = ?', [$redaxoId]);
        $listing->setLimit(1);

        /** @var Event[] $result */
        $result = self::useHideUnpublishedWithListing($hideUnpublished, $listing);

        return $result[0] ?? null;
    }

    public function findOneByArticleSliceId(int $articleSliceId, bool $hideUnpublished = true): ?Event
    {
        $listing = new Listing();
        $listing->setCondition(Event::FIELD_REDAXO_ARTICLE_SLICE_ID . ' = ?', [$articleSliceId]);
        $listing->setLimit(1);

        /** @var Event[] $result */
        $result = self::useHideUnpublishedWithListing($hideUnpublished, $listing);

        return $result[0] ?? null;
    }

    public function findOneBySlug(string $slug, bool $hideUnpublished = true): ?Event
    {
        $listing = new Listing();
        $listing->setCondition(Event::FIELD_SLUG . ' = ?', [$slug]);
        $listing->setLimit(1);

        /** @var Event[] $result */
        $result = self::useHideUnpublishedWithListing($hideUnpublished, $listing);

        return $result[0] ?? null;
    }

    /**
     * @return Event[]
     */
    public function findAllWithRedaxoIdOrderedByDateStartDesc(bool $hideUnpublished = true): array
    {
        $listing = new Listing();
        $listing->setCondition(Event::FIELD_REDAXO_ID . ' IS NOT NULL');
        $listing->setOrderKey(Event::FIELD_DATE_START);
        $listing->setOrder('desc');

        return self::useHideUnpublishedWithListing($hideUnpublished, $listing);
    }

    /**
     * @return Event[]
     */
    public function findAllWithRedaxoArticleSliceIdOrderedByRedaxoArticleSliceIdDesc(bool $hideUnpublished = true): array
    {
        $listing = new Listing();
        $listing->setCondition(Event::FIELD_REDAXO_ARTICLE_SLICE_ID . ' IS NOT NULL');
        $listing->setOrderKey(Event::FIELD_REDAXO_ARTICLE_SLICE_ID);
        $listing->setOrder('desc');

        return self::useHideUnpublishedWithListing($hideUnpublished, $listing);
    }

    /**
     * @return Event[]
     */
    public function findAllWithoutRedaxoIdsOrderedByOoidDesc(bool $hideUnpublished = true): array
    {
        $listing = new Listing();
        $listing->setCondition(Event::FIELD_REDAXO_ID . ' IS NULL AND ' . Event::FIELD_REDAXO_ARTICLE_SLICE_ID . ' IS NULL');
        $listing->setOrderKey('oo_id');
        $listing->setOrder('desc');

        return self::useHideUnpublishedWithListing($hideUnpublished, $listing);
    }
}
