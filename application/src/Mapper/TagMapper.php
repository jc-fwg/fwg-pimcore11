<?php

declare(strict_types=1);

namespace App\Mapper;

use App\Dto\TagDto;
use Pimcore\Model\DataObject\Tag;
use Pimcore\Model\DataObject\TagCategory;

readonly class TagMapper
{
    public function __construct(
        private TagCategoryMapper $tagCategoryMapper,
    )
    {
    }

    public function fromModel(Tag $model): TagDto
    {
        $parent = $model->getParent();

        if (!$parent instanceof TagCategory) {
            throw new \RuntimeException('Tag has no parent category');
        }

        return new TagDto(
            id: $model->getId(),
            tagCategory: $this->tagCategoryMapper->fromModel($parent),
            name: $model->getName(),
            emoji: $model->getEmoji(),
            description: $model->getDescription(),
            slug: $model->getSlug(),
            hideInList: $model->getHideInList(),
        );
    }
}
