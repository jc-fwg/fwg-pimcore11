<?php

declare(strict_types=1);

namespace App\Mapper;

use App\Dto\TagCategoryDto;
use Pimcore\Model\DataObject\TagCategory;

class TagCategoryMapper
{
    public function fromModel(TagCategory $model): TagCategoryDto
    {
        return new TagCategoryDto(
            id: $model->getId(),
            name: $model->getName(),
            slug: $model->getSlug(),
            weight: $model->getWeight(),
        );
    }
}
