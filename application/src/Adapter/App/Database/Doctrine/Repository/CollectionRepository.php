<?php

declare(strict_types=1);

namespace App\Adapter\App\Database\Doctrine\Repository;

use App\Service\Paginator;
use App\ValueObject\Paginator\PaginationValueObject;
use Pimcore\Model\DataObject;

class CollectionRepository extends AbstractRepository
{
    public function __construct(
        private readonly Paginator $paginator,
    ) {
    }
    public function getBySlug(string $slug): ?DataObject\Collection
    {
        return DataObject\Collection::getBySlug($slug, 1);
    }

    /**
     * @return array<int, DataObject\Collection>
     */
    public function findAll(): array
    {
        return (new DataObject\Collection\Listing())?->getObjects();
    }

    public function findAllPaginated(?int $itemsPerPage = null, ?int $currentPage = null): PaginationValueObject
    {
        $listing = new DataObject\Collection\Listing();

        return $this->paginator->getPagination($listing, $itemsPerPage, $currentPage);
    }

    public function getByWordPressSlug(string $slug): ?DataObject\Collection
    {
        return DataObject\Collection::getByWordPressSlug($slug, 1);
    }

    public function getExpectedClass(): string
    {
        return DataObject\Collection::class;
    }
}
