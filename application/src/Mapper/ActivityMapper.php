<?php

declare(strict_types=1);

namespace App\Mapper;

use App\Adapter\App\Database\Doctrine\Repository\FeatureRepository;
use App\Dto\ActivityDto;
use Pimcore\Model\DataObject\Activity;
use Pimcore\Model\DataObject\Feature;

class ActivityMapper
{
    public function __construct(
        private readonly FeatureRepository $featureRepository,
        private readonly FeatureMapper $featureMapper,
    )
    {
    }

    public function fromModel(Activity $model): ActivityDto
    {
        $dto = new ActivityDto(
            id: $model->getId(),
            activityType: $model->getActivityType(),
            title: $model->getTitle(),
            date: $model->getDate(),
            weather: $model->getWeather(),
            temperature: $model->getTemperature(),
        );

        // Features
        foreach ($model->getFeatures() as $featureId) {
            $feature = $this->featureRepository->findById($featureId);

            if (!$feature instanceof Feature) {
                continue;
            }

            $dto->features[] = $this->featureMapper->fromModel($feature);
        }

        return $dto;
    }
}
