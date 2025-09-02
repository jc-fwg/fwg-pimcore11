<?php

declare(strict_types=1);

namespace App\Adapter\App\Database\Doctrine\Repository;

use Pimcore\Model\DataObject;

class CollectionRepository extends AbstractRepository
{
    public function getBySlug(string $slug): ?DataObject\Collection
    {
        return DataObject\Collection::getBySlug($slug, 1);
    }

    public function getByWordPressSlug(string $slug): ?DataObject\Collection
    {
        return DataObject\Collection::getByWordPressSlug($slug, 1);
    }

    public function getExpectedClass(): string
    {
        return DataObject\Collection::class;
    }
}
