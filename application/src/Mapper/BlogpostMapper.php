<?php

namespace App\Mapper;

use App\Dto\BlogpostDto;
use Pimcore\Model\DataObject\Blogpost;

class BlogpostMapper
{
    public function fromModel(Blogpost $model): BlogpostDto
    {
        return new BlogpostDto(
            id: $model->getId(),
            blogpostType:  $model->getBlogpostType(),
        );
    }
}
