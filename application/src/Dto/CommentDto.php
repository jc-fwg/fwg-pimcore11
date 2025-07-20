<?php

declare(strict_types=1);

namespace App\Dto;

use Carbon\Carbon;
use Pimcore\Model\DataObject\Comment;

class CommentDto
{
    /**
     * @param array<Comment> $children
     */
    public function __construct(
        public readonly int $id,
        public ?Carbon $dateTime = null,
        public ?string $name = null,
        public ?string $website = null,
        public ?string $comment = null,
        public array $children = [],
    ) {
    }
}
