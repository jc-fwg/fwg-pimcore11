<?php

declare(strict_types=1);

namespace App\Adapter\App\Database\Doctrine\Repository;

use Pimcore\Model\DataObject\RentalObject;
use Pimcore\Model\DataObject\RentalObject\Listing;

class RentalObjectRepository extends AbstractRepository
{
    public function findOneByArticleSliceId(string $articleSliceId, bool $hideUnpublished = true): ?RentalObject
    {
        $listing = new Listing();
        $listing->setCondition(RentalObject::FIELD_REDAXO_ARTICLE_SLICE_ID . ' = ?', [$articleSliceId]);
        $listing->setLimit(1);

        /** @var RentalObject[] $result */
        $result = self::useHideUnpublishedWithListing($hideUnpublished, $listing);

        return $result[0] ?? null;
    }

    /**
     * @return array<RentalObject>
     */
    public function findAll(bool $hideUnpublished = true): array
    {
        // Find all rental objects without Redaxo article slice ID
        $listing = new Listing();
        $listing->setCondition(RentalObject::FIELD_REDAXO_ARTICLE_SLICE_ID . ' IS NULL');

        $result = self::useHideUnpublishedWithListing($hideUnpublished, $listing);

        // Find and merge all rental objects with Redaxo article slice ID
        $listing = new Listing();
        $listing->setCondition(RentalObject::FIELD_REDAXO_ARTICLE_SLICE_ID . ' IS NOT NULL');
        $listing->setOrderKey(RentalObject::FIELD_REDAXO_ARTICLE_SLICE_ID);
        $listing->setOrder("DESC");

        /** @var RentalObject[] $result */
        return array_merge($result, self::useHideUnpublishedWithListing($hideUnpublished, $listing));
    }

    public function findOneBySlug(string $slug, bool $hideUnpublished = true): ?RentalObject
    {
        $listing = new Listing();
        $listing->setCondition(RentalObject::FIELD_SLUG . ' = ?', [$slug]);
        $listing->setLimit(1);

        /** @var RentalObject[] $result */
        $result = self::useHideUnpublishedWithListing($hideUnpublished, $listing);

        return $result[0] ?? null;
    }
}
