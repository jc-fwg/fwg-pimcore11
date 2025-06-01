<?php

declare(strict_types=1);

namespace App\Mapper;

use App\Dto\CountryDto;
use Pimcore\Model\DataObject\Country;

class CountryMapper
{
    public function fromModel(Country $model): CountryDto
    {
        return new CountryDto(
            id: $model->getId(),
            name: $model->getName() ?? $model->getKey(),
        );
    }
}
