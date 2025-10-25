<?php

declare(strict_types=1);

namespace App\Service;

use Pimcore\Model\DataObject;

class CollectionService
{
    public function __construct(
    ) {
    }

    /**
     * @return DataObject\Collection[]
     */
    public function getRecommendedCollections(DataObject\Collection $collection): array
    {
        $collections = $collection->getSiblings([DataObject\AbstractObject::OBJECT_TYPE_OBJECT])?->load();
        foreach ($collection->getAdditionalRecommendationEntrypoints() as $parent) {
            if (!$parent instanceof DataObject\Folder) {
                continue;
            }

            $collections = array_merge($collections, $parent->getChildren([DataObject\AbstractObject::OBJECT_TYPE_OBJECT])?->load());
        }

        return  array_filter($collections, static fn ($collection) => $collection instanceof DataObject\Collection);
    }
}
