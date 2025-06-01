<?php

declare(strict_types=1);

namespace App\Dto;

class FeatureDto
{
    public function __construct(
        public readonly int $id,
        public ?string $name = null,
        public ?string $emoji = null,
    ) {
    }
}
