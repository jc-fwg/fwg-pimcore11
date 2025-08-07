<?php

declare(strict_types=1);

namespace App\Adapter\App\Database\Doctrine\Repository;

use Exception;
use Pimcore\Model\DataObject;
use Pimcore\Model\DataObject\Comment\Listing;

class BlogpostRepository extends AbstractRepository
{
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
}
