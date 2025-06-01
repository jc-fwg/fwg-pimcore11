<?php

declare(strict_types=1);

namespace App\Adapter\App\Database\Doctrine\Repository;

use Pimcore\Model\DataObject\Region;

class RegionRepository extends AbstractRepository
{
    public function getExpectedClass(): string
    {
        return Region::class;
    }
}
