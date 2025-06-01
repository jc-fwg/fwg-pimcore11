<?php

declare(strict_types=1);

namespace App\Dto;

class RegionDto
{
    /** @param StateDto[] $states */
    public function __construct(
        public readonly int $id,
        public ?string $name = null,
        public ?string $description = null,
        public ?array $states = [],
    )
    {
    }
}
