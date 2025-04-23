<?php

declare(strict_types=1);

namespace App\Adapter\App\Database\Doctrine\Repository;

use Doctrine\DBAL\Connection;
use Exception;
use Pimcore\Model\DataObject;

class FeatureRepository extends AbstractRepository
{
    public function __construct(
        private readonly Connection $connection,
    ) {
    }

    /**
     * @return array<int, array<string, int|string>>
     *
     * @throws Exception
     */
    public function findAllAsSelectOptions(): array
    {
        $queryBuilder = $this->connection->createQueryBuilder()
            ->select('id AS `value`, `key`')
            ->from('objects')
            ->where('classId = :classId')
            ->andWhere('type = :type')
            ->orderBy('`key`', 'ASC')
            ->setParameter('classId', DataObject\Feature::classId())
            ->setParameter('type', DataObject\AbstractObject::OBJECT_TYPE_OBJECT);

        $results = $queryBuilder->fetchAllAssociative();

        return array_map(static fn (array $row): array => [
            'value' => (int) $row['value'],
            'key'   => (string) $row['key'],
        ], $results);
    }
}
