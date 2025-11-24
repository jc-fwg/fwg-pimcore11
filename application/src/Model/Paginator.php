<?php

namespace App\Model;

use App\ValueObject\Paginator\PaginationValueObject;
use Pimcore\Model\DataObject\Concrete;
use Pimcore\Model\DataObject\Listing;

class Paginator
{
    private const int DEFAULT_ITEMS_PER_PAGE = 10;
    private const int DEFAULT_CURRENT_PAGE = 1;

    public function __construct(

        /** @var Concrete[] $items */
        public readonly Listing $listing,

        public ?int $itemsPerPage = null,
        public ?int $currentPage = null,
    )
    {
        $this->itemsPerPage = $itemsPerPage ?? self::DEFAULT_ITEMS_PER_PAGE;
        $this->currentPage = $currentPage ?? self::DEFAULT_CURRENT_PAGE;
    }

    public function getPagination(): PaginationValueObject
    {
        $totalItems = $this->listing->getCount();
        $totalPages = (int) ceil($totalItems / $this->itemsPerPage);
        $startIndex = ($this->currentPage - 1) * $this->itemsPerPage;

        return new PaginationValueObject(
            items: $this->listing->getItems($startIndex, $this->itemsPerPage),
            totalItems: $totalItems,
            itemsPerPage: $this->itemsPerPage,
            currentPage: $this->currentPage,
            totalPages: $totalPages,
        );
    }
}
