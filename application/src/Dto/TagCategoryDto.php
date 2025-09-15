<?php

declare(strict_types=1);

namespace App\Dto;

class TagCategoryDto
{
    public function __construct(
        public readonly int $id,
        public ?string $name = null,
        public ?string $slug = null,
        public ?float $weight = null,
    ) {
    }
}
