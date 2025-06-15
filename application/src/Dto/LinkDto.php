<?php

declare(strict_types=1);

namespace App\Dto;

class LinkDto
{
    public function __construct(
        public readonly string $text,
        public readonly string $path,
        public string $target = '_blank',
    ) {
    }
}
