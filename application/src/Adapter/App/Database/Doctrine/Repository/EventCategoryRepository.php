<?php

declare(strict_types=1);

namespace App\Adapter\App\Database\Doctrine\Repository;

use Pimcore\Db;
use Pimcore\Model\DataObject\EventCategory;
use Pimcore\Model\DataObject\EventCategory\Listing;

class EventCategoryRepository extends AbstractRepository
{
    public function findOneByRedaxoId(string $redaxoId, bool $hideUnpublished = true): ?EventCategory
    {
        $listing = new Listing();
        $listing->setCondition(EventCategory::FIELD_REDAXO_ID . ' = ?', [$redaxoId]);
        $listing->setLimit(1);

        /** @var EventCategory[] $result */
        $result = self::useHideUnpublishedWithListing($hideUnpublished, $listing);

        return $result[0] ?? null;
    }

    /**
     * @return array{
     *     oo_id: int,
     *     name: string,
     *     slug: string
     * }
     * @throws \Doctrine\DBAL\Exception
     */
    public function getAllWithPublishedEvents(): array
    {
        return  Db::get()->fetchAllAssociative(
            '
                SELECT oo_id, name, slug
                FROM object_query_eventCategory
                WHERE oo_id IN
                (
                    SELECT eventCategory
                    FROM object_query_event
                    GROUP BY eventCategory
                )
            '
        );
    }
}
