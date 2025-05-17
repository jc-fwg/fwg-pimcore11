<?php

declare(strict_types=1);

namespace App\Adapter\App\Database\Doctrine\Repository;

use Doctrine\DBAL\Connection;
use Exception;
use Pimcore\Model\DataObject;

class BlogpostRepository extends AbstractRepository
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

    /** @return DataObject\Blogpost[] */
    public function findLatest(int $limit = 3): array
    {
        $listing = new DataObject\Blogpost\Listing();
        $listing->setOrderKey(DataObject\Blogpost::FIELD_PUBLICATION_DATE);
        $listing->setOrder('desc');
        $listing->setLimit($limit);

        return $listing->getObjects();
    }
}
