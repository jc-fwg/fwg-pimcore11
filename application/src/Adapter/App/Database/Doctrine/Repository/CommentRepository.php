<?php

declare(strict_types=1);

namespace App\Adapter\App\Database\Doctrine\Repository;

use Exception;
use Pimcore\Model\DataObject;
use Pimcore\Model\DataObject\Comment\Listing;

class CommentRepository extends AbstractRepository
{
    public function getExpectedClass(): string
    {
        return DataObject\Comment::class;
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
