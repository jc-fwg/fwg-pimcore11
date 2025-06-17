<?php

declare(strict_types=1);

namespace App\Dto;

class ActivityLocationDto
{
    public function __construct(
        public readonly string $locationType,
        public readonly string $name,
        public ?LinkDto $link = null,
    ) {
    }
}
