<?php

declare(strict_types=1);

namespace App\Dto;

use Pimcore\Model\Asset\Image;

class AuthorDto
{
    public function __construct(
        public readonly int $id,
        public TagDto $tag,
        public ?string $name = null,
        public ?string $description = null,
        public ?Image $image = null,
    ) {
    }
}
