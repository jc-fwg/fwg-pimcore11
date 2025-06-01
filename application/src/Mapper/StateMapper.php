<?php

declare(strict_types=1);

namespace App\Mapper;

use App\Dto\RegionDto;
use App\Dto\StateDto;
use Pimcore\Model\DataObject\Region;
use Pimcore\Model\DataObject\State;

class StateMapper
{
    public function fromModel(State $model): StateDto
    {
        return new StateDto(
            id: $model->getId(),
            name: $model->getName(),
            country: $model->getCountry(),
        );
    }
}
