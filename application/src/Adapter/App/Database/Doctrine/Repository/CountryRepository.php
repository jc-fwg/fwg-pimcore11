<?php

declare(strict_types=1);

namespace App\Adapter\App\Database\Doctrine\Repository;

use Pimcore\Model\DataObject;
use Pimcore\Model\DataObject\Country;
use Pimcore\Model\DataObject\Region;
use Pimcore\Model\DataObject\State;

class CountryRepository extends AbstractRepository
{
    public function getExpectedClass(): string
    {
        return Region::class;
    }

    public function getCountryByState(State $state): ?Country
    {
        $parentId = $state->getParent()?->getId();

        if ($parentId === null) {
            return null;
        }

        while ($parentId !== 1) {
            $parent = DataObject\AbstractObject::getById($parentId);

            if ($parent instanceof Country) {
                return $parent;
            }

            $parentId = $parent->getParent()?->getId();
        }

        return null;
    }
}
