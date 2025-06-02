<?php

declare(strict_types=1);

namespace App\Dto;

class ActivityTagDto
{
    public function __construct(
        public readonly TagDto $tag,
        public ?bool           $isHeadline = false,
    ) {
    }
}
