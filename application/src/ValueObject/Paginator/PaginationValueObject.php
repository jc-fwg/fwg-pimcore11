<?php

declare(strict_types=1);

namespace App\ValueObject\Paginator;

use Pimcore\Model\DataObject;

final readonly class PaginationValueObject
{
    public function __construct(
        /** @var DataObject[] */
        public array $items,

        public int $totalItems,
        public int $itemsPerPage,
        public int $currentPage,
        public int $totalPages,
    ) {
    }
}
