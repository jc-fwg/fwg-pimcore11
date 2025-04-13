<?php

declare(strict_types=1);

namespace App\Adapter\App\Database\Doctrine\Repository;

use Pimcore\Model\DataObject\Customer\Listing;
use Pimcore\Model\DataObject\Customer;

class CustomerRepository extends AbstractRepository
{
    public function findOneByName(string $name, bool $hideUnpublished = true): ?Customer
    {
        $listing = new Listing();
        $listing->setCondition(Customer::FIELD_NAME . ' = ?', [$name]);
        $listing->setLimit(1);

        /** @var Customer[] $result */
        $result = self::useHideUnpublishedWithListing($hideUnpublished, $listing);

        return $result[0] ?? null;
    }
}
