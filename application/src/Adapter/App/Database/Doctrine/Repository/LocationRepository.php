<?php

declare(strict_types=1);

namespace App\Adapter\App\Database\Doctrine\Repository;

use Pimcore\Model\DataObject\Location\Listing;
use Pimcore\Model\DataObject\Location;

class LocationRepository extends AbstractRepository
{
    public function findOneByName(string $name, bool $hideUnpublished = true): ?Location
    {
        $listing = new Listing();
        $listing->setCondition(Location::FIELD_NAME . ' = ?', [$name]);
        $listing->setLimit(1);

        /** @var Location[] $result */
        $result = self::useHideUnpublishedWithListing($hideUnpublished, $listing);

        return $result[0] ?? null;
    }
}
