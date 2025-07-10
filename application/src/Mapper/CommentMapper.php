<?php

declare(strict_types=1);

namespace App\Mapper;

use App\Dto\AuthorDto;
use App\Dto\CommentDto;
use Pimcore\Model\DataObject\Author;
use Pimcore\Model\DataObject\Comment;

class CommentMapper
{
    public function fromModel(Comment $model): CommentDto
    {
        return new CommentDto(
            id: $model->getId(),
            dateTime: $model->getDateTime(),
            name: $model->getName(),
            website: $model->getWebsite(),
            comment: $model->getComment()
        );
    }
}
