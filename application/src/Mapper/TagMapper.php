<?php

declare(strict_types=1);

namespace App\Mapper;

use App\Dto\TagDto;
use Pimcore\Model\DataObject\Tag;

class TagMapper
{
    public function fromModel(Tag $model): TagDto
    {
        return new TagDto(
            id: $model->getId(),
            name: $model->getName(),
            emoji: $model->getEmoji(),
        );
    }
}
