<?php

declare(strict_types=1);

namespace App\Mapper;

use App\Dto\AuthorDto;
use Pimcore\Model\DataObject\Author;

class AuthorMapper
{
    public function __construct(
        private readonly TagMapper $tagMapper,
    ) {
    }

    public function fromModel(Author $model): AuthorDto
    {
        $tag = $model->getTag();

        return new AuthorDto(
            id: $model->getId(),
            tag: $this->tagMapper->fromModel($tag),
            name: $model->getName(),
            description: $model->getDescription(),
            image: $model->getImageMain(),
        );
    }
}
