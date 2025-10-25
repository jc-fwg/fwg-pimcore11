<?php

declare(strict_types=1);

namespace App\Adapter\App\Database\Doctrine\Repository;

use Pimcore\Model\DataObject;

class CommentRepository extends AbstractRepository
{
    public function getExpectedClass(): string
    {
        return DataObject\Comment::class;
    }
}
