<?php

declare(strict_types=1);

namespace App\Adapter\App\Database\Doctrine\Repository;

use Doctrine\DBAL\ArrayParameterType;
use Doctrine\DBAL\Connection;
use Doctrine\DBAL\Exception;
use Pimcore\Model\DataObject;

class TagRepository extends AbstractRepository
{
    public const string TABLE_NAME_OBJECTS                = 'objects';
    public const string TABLE_NAME_OBJECTS_QUERY          = 'object_query_tag';
    public const string TABLE_NAME_OBJECTS_TAG_CATEGORIES = 'object_query_tagCategory';

    public function __construct(
        private readonly Connection $connection,
    ) {
    }

    /**
     * @param string[] $ids
     *
     * @return array<int, array<string, mixed>>
     *
     * @throws Exception
     */
    public function findAllOrderedByTagCategoryWeighting(array $ids = []): array
    {
        $queryBuilder = $this->connection->createQueryBuilder()
            ->select('
                    tags.oo_id,
                    tags.name,
                    tags.emoji,
                    objects.parentId,
                    tagCategories.weight
                '
            )
            ->from(self::TABLE_NAME_OBJECTS_QUERY, 'tags')
            ->leftJoin('tags', self::TABLE_NAME_OBJECTS, 'objects', 'tags.oo_id = objects.id')
            ->leftJoin('objects', self::TABLE_NAME_OBJECTS_TAG_CATEGORIES, 'tagCategories', 'objects.parentId = tagCategories.oo_id')
            ->orderBy('tagCategories.weight', 'DESC');

        if (empty($ids) === false) {
            $queryBuilder
                ->where('tags.oo_id IN (:ids)')
                ->setParameter('ids', $ids, ArrayParameterType::STRING);
        }

        return $queryBuilder->fetchAllAssociative();
    }

    public function getExpectedClass(): string
    {
        return DataObject\Tag::class;
    }
}
