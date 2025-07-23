<?php

declare(strict_types=1);

namespace App\Dto;

use Carbon\Carbon;
use Pimcore\Model\DataObject\Comment;
use Symfony\Component\Validator\Constraints as Assert;

class CommentDto
{
    /**
     * @param array<Comment> $children
     */
    public function __construct(
        public readonly int $parentId,
        public readonly Carbon $dateTime,
        public readonly ?int $id,

        #[Assert\NotBlank()]
        public readonly ?string $name = null,

        #[Assert\NotBlank()]
        #[Assert\Email()]
        public readonly ?string $email = null,

        #[Assert\NotBlank()]
        public readonly ?string $comment = null,
        public readonly ?string $website = null,
        public array $children = [],
    ) {
    }
}
