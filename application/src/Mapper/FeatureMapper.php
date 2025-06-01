<?php

declare(strict_types=1);

namespace App\Mapper;

use App\Dto\FeatureDto;
use Pimcore\Model\DataObject\Feature;

class FeatureMapper
{
    public function fromModel(Feature $model): FeatureDto
    {
        return new FeatureDto(
            id: $model->getId(),
            name: $model->getName() ?? $model->getKey(),
            emoji: $model->getEmoji(),
        );
    }
}
