<?php

declare(strict_types=1);

namespace App\Adapter\App\Database\Doctrine\Repository;

use Doctrine\DBAL\Connection;
use Exception;
use Pimcore\Model\DataObject;
use Pimcore\Model\DataObject\Comment\Listing;

use function sprintf;

class BlogpostRepository extends AbstractRepository
{
    private const string TABLE_NAME_OBJECTS_QUERY_BLOGPOST = 'object_query_blogpost';
    private const string TABLE_NAME_OBJECTS_QUERY_ACTIVITY = 'object_query_activity';

    public function __construct(
        private readonly Connection $connection,
    ) {
    }

    /**
     * @return array<int, array<string, int|string>>
     *
     * @throws Exception
     */

    /** @return DataObject\Blogpost[] */
    public function findLatest(int $limit = 3): array
    {
        $listing = new DataObject\Blogpost\Listing();
        $listing->setOrderKey(DataObject\Blogpost::FIELD_PUBLICATION_DATE);
        $listing->setOrder('desc');
        $listing->setLimit($limit);

        return $listing->getObjects();
    }

    public function getBySlug(string $slug): ?DataObject\Blogpost
    {
        return DataObject\Blogpost::getBySlug($slug, 1);
    }

    public function getByWordPressSlug(string $slug): ?DataObject\Blogpost
    {
        return DataObject\Blogpost::getByWordPressSlug($slug, 1);
    }

    public function getExpectedClass(): string
    {
        return DataObject\Blogpost::class;
    }

    /**
     * @return array<int, array<string, DataObject\Comment|array>>
     *
     * @throws Exception
     */
    public function getCommentTree(int $parentId, ?string $order = 'desc'): array
    {
        $commentsList = new Listing();

        $commentsList->setOrderKey(DataObject\Comment::FIELD_DATE_TIME);
        $commentsList->setOrder($order);
        $commentsList->setCondition('parentId = ?', $parentId);

        $comments = $commentsList->getObjects();

        $tree = [];
        foreach ($comments as $comment) {
            $children = $this->getCommentTree($comment->getId(), 'asc');
            $tree[]   = [
                'comment'  => $comment,
                'children' => $children,
            ];
        }

        return $tree;
    }

    /**
     * @param DataObject\Category[] $categories
     *
     * @return DataObject\Blogpost[]
     */
    public function findAllByCategories(array $categories): array
    {
        $listing = new DataObject\Blogpost\Listing();

        foreach ($categories as $key => $category) {
            match (true) {
                $key === 0 => $listing->setCondition("FIND_IN_SET('{$category->getId()}', categories)"),
                default    => $listing->addConditionParam("FIND_IN_SET('{$category->getId()}', categories)", concatenator: ' OR '),
            };
        }

        return $listing->load();
    }

    /**
     * @param DataObject\Tag[] $tags
     *
     * @return DataObject\Blogpost[]
     *
     * @throws \Doctrine\DBAL\Exception
     */
    public function findAllByTags(array $tags, string $combine = 'OR'): array
    {
        if (empty($tags)) {
            return [];
        }

        $tagsSetQuery = [];
        foreach ($tags as $tag) {
            $tagsSetQuery[] = "FIND_IN_SET('{$tag->getId()}', tags)";
        }

        $queryBuilder = $this->connection->createQueryBuilder()
            ->select('
                    blogposts.oo_id AS blogpost_id
                '
            )
            ->from(self::TABLE_NAME_OBJECTS_QUERY_BLOGPOST, 'blogposts')
            ->leftJoin('blogposts', self::TABLE_NAME_OBJECTS_QUERY_ACTIVITY, 'activities', 'blogposts.activity__id = activities.oo_id')
            ->where(
                sprintf('
                    blogposts.activity__id > 0
                    AND (%s)
                    ',
                    implode(sprintf(' %s ', $combine), $tagsSetQuery)
                )
            )
            ->orderBy('blogposts.publicationDate', 'DESC');
        $blogpostIds = $queryBuilder->fetchFirstColumn();

        $blogpostListing = new DataObject\Blogpost\Listing();
        $blogpostListing->setCondition('oo_id IN (:ids)', ['ids' => $blogpostIds]);

        // Add blogposts with author tags via array_unique?
        // Using
        // - existing query above
        // - Blogpost Listing with condition for tags and array_unique

        return $blogpostListing->load();
    }
}
