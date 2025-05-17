<?php

namespace App\Dto;

use Pimcore\Model\Asset\Image;

class AuthorDto
{
    public function __construct(
        public readonly string $id,
        public ?string $name = null,
        public ?string $description = null,
        public ?Image $image = null,
    )
    {
    }
}
