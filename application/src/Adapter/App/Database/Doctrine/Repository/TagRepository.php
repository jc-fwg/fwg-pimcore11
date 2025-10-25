<?php

declare(strict_types=1);

namespace App\Adapter\App\Database\Doctrine\Repository;

use Doctrine\DBAL\ArrayParameterType;
use Doctrine\DBAL\Connection;
use Doctrine\DBAL\Exception;
use Pimcore\Model\DataObject;
use Pimcore\Model\Exception\NotFoundException;

use function count;
use function sprintf;

class TagRepository extends AbstractRepository
{
    public const string TABLE_NAME_OBJECTS                    = 'objects';
    public const string TABLE_NAME_OBJECTS_QUERY_TAG          = 'object_query_tag';
    public const string TABLE_NAME_OBJECTS_TAG_CATEGORIES     = 'object_query_tagCategory';
    public const string TABLE_NAME_OBJECTS_RELATIONS_ACTIVITY = 'object_relations_activity';

    public function __construct(
        private readonly Connection $connection,
    ) {
    }

    /**
     * @param string[] $ids
     *
     * @return DataObject\Tag[]
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
                    tags.description,
                    tags.slug,
                    tagCategories.oo_id AS tagCategoryId,
                    tagCategories.weight
                '
            )
            ->from(self::TABLE_NAME_OBJECTS_QUERY_TAG, 'tags')
            ->leftJoin('tags', self::TABLE_NAME_OBJECTS, 'objects', 'tags.oo_id = objects.id')
            ->leftJoin('objects', self::TABLE_NAME_OBJECTS_TAG_CATEGORIES, 'tagCategories', 'objects.parentId = tagCategories.oo_id')
            ->orderBy('tagCategories.weight', 'DESC');

        if (empty($ids) === false) {
            $queryBuilder
                ->where('tags.oo_id IN (:ids)')
                ->setParameter('ids', $ids, ArrayParameterType::STRING);
        }

        $tagList = new DataObject\Tag\Listing();
        $tagList->setCondition('oo_id IN ('.implode(',', $queryBuilder->executeQuery()->fetchFirstColumn()).')');

        return $tagList->getObjects();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function findAllCurrentlyRelated(): array
    {
        $tags = (new DataObject\Tag\Listing())->getObjects();

        return array_filter($tags, static fn ($tag) => count($tag->getActivities()) > 0);
    }

    public function getBySlug(string $slug): DataObject\Tag
    {
        $tag = DataObject\Tag::getBySlug($slug, 1);

        if (!$tag instanceof DataObject\Tag) {
            throw new NotFoundException(sprintf('Tag with slug "%s" not found', $slug));
        }

        return $tag;
    }

    public function getByParentAndTagSlugs(array $tagPair): DataObject\Tag
    {
        $parent = DataObject\TagCategory::getBySlug($tagPair['parentSlug'], 1);

        if (!$parent instanceof DataObject\TagCategory) {
            throw new NotFoundException(sprintf('TagCategory with slug "%s" not found', $tagPair['parentSlug']));
        }

        $tag = DataObject\Tag::getBySlug($tagPair['tagSlug'], 1);

        if (
            !$tag instanceof DataObject\Tag
            || $tag->getParentId() !== $parent->getId()
        ) {
            throw new NotFoundException(sprintf('Tag with slug "%s" not found in TagCategory "%s"', $tagPair['tagSlug'], $tagPair['parentSlug']));
        }

        return $tag;
    }

    public function getExpectedClass(): string
    {
        return DataObject\Tag::class;
    }
}
