<?php

declare(strict_types=1);

namespace App\Dto;

use Carbon\Carbon;

class CommentDto
{
    public function __construct(
        public readonly int $id,
        public ?Carbon $dateTime = null,
        public ?string $name = null,
        public ?string $website = null,
        public ?string $comment = null,
    ) {
    }
}
