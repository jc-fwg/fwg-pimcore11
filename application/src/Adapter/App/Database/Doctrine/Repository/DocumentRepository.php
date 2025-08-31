<?php

declare(strict_types=1);

namespace App\Adapter\App\Database\Doctrine\Repository;

use Pimcore\Model\Document;
use Pimcore\Model\Document\Listing;

class DocumentRepository extends AbstractRepository
{
    /**
     * @return Listing
     */
    public function findChildrenByFolder(Document\Folder $folder): Document\Listing
    {
        return $folder->getChildren();
    }

    protected function getExpectedClass(): string
    {
        return Document::class;
    }
}
