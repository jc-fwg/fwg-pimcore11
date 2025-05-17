<?php

namespace App\Mapper;

use App\Dto\AuthorDto;
use Pimcore\Model\DataObject\Author;

class AuthorMapper
{
    public function fromModel(Author $model): AuthorDto
    {
        return new AuthorDto(
            id: $model->getId(),
            name: $model->getName(),
            description: $model->getDescription(),
            image: $model->getImageMain(),
        );
    }
}
