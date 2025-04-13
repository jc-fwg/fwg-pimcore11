<?php

declare(strict_types=1);

namespace App\Adapter\App\Database\Doctrine\Repository;

use Pimcore\Model\DataObject\RentalCategory;
use Pimcore\Model\DataObject\RentalCategory\Listing;

class RentalCategoryRepository extends AbstractRepository
{
    public function findOneByRedaxoId(string $redaxoId, bool $hideUnpublished = true): ?RentalCategory
    {
        $listing = new Listing();
        $listing->setCondition(RentalCategory::FIELD_REDAXO_ID . ' = ?', [$redaxoId]);
        $listing->setLimit(1);

        /** @var RentalCategory[] $result */
        $result = self::useHideUnpublishedWithListing($hideUnpublished, $listing);

        return $result[0] ?? null;
    }
}
