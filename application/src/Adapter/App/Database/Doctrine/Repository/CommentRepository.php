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
}
