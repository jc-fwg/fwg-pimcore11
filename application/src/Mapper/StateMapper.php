<?php

declare(strict_types=1);

namespace App\Mapper;

use App\Adapter\App\Database\Doctrine\Repository\CountryRepository;
use App\Dto\StateDto;
use Pimcore\Model\DataObject\State;

class StateMapper
{
    public function __construct(
        private readonly CountryMapper $countryMapper,
        private readonly CountryRepository $countryRepository,
    ) {
    }

    public function fromModel(State $model): StateDto
    {
        $country = $this->countryRepository->getCountryByState($model);

        return new StateDto(
            id: $model->getId(),
            name: $model->getName(),
            country: $country ? $this->countryMapper->fromModel($model->getCountry()) : null,
        );
    }
}
