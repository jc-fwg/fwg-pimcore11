<?php

declare(strict_types=1);

namespace App\Dto;

class TagDto
{
    public function __construct(
        public readonly int $id,
        public ?string $name = null,
        public ?string $emoji = null,
    ) {
    }
}
