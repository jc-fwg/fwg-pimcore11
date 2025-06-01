<?php

declare(strict_types=1);

namespace App\Mapper;

use App\Dto\RegionDto;
use Pimcore\Model\DataObject\Region;

class RegionMapper
{
    public function __construct(
        private readonly StateMapper $stateMapper,
    )
    {
    }

    public function fromModel(Region $model): RegionDto
    {
        $states = [];
        foreach ($model->getStates() ?? [] as $state) {
            $states[] = $this->stateMapper->fromModel($state);
        }

        return new RegionDto(
            id: $model->getId(),
            name: $model->getName(),
            description: $model->getDescription(),
            states: $states,
        );
    }
}
