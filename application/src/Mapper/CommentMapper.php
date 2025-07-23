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
            parentId: $model->getParentId(),
            dateTime: $model->getDateTime(),
            id: $model->getId(),
            name: $model->getName(),
            email: $model->getEmail(),
            comment: $model->getComment(),
            website: $model->getWebsite()
        );
    }
}
