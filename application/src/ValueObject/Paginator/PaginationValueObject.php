<?php

declare(strict_types=1);

namespace App\ValueObject\Paginator;

use Pimcore\Model\DataObject;

final readonly class PaginationValueObject
{
    public function __construct(
        /** @var DataObject[] $items */
        public array $items,

        public int $totalItems,
        public int $itemsPerPage,
        public int $currentPage,
        public int $totalPages,
        public int $rangeStart,
        public int $rangeEnd,
        public string $queryString,
    ) {
    }
}
