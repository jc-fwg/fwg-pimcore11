<?php

declare(strict_types=1);

namespace App\Adapter\App\Database\Doctrine\Repository;

use Pimcore\Model\DataObject\Manufacturer;
use Pimcore\Model\DataObject\Manufacturer\Listing;

class ManufacturerRepository extends AbstractRepository
{
    public function findOneByName(string $name, bool $hideUnpublished = true): ?Manufacturer
    {
        $listing = new Listing();
        $listing->setCondition(Manufacturer::FIELD_NAME . ' = ?', [$name]);
        $listing->setLimit(1);

        /** @var Manufacturer[] $result */
        $result = self::useHideUnpublishedWithListing($hideUnpublished, $listing);

        return $result[0] ?? null;
    }
    public function findOneByRedaxoId(string $redaxoId, bool $hideUnpublished = true): ?Manufacturer
    {
        $listing = new Listing();
        $listing->setCondition(Manufacturer::FIELD_REDAXO_ID . ' = ?', [$redaxoId]);
        $listing->setLimit(1);

        /** @var Manufacturer[] $result */
        $result = self::useHideUnpublishedWithListing($hideUnpublished, $listing);

        return $result[0] ?? null;
    }
}
