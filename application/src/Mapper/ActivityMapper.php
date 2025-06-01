<?php

declare(strict_types=1);

namespace App\Mapper;

use App\Adapter\App\Database\Doctrine\Repository\FeatureRepository;
use App\Dto\ActivityDto;
use Exception;
use Pimcore\Model\DataObject\Activity;
use Pimcore\Model\DataObject\Feature;

class ActivityMapper
{
    public function __construct(
        private readonly FeatureRepository $featureRepository,
        private readonly FeatureMapper $featureMapper,
        private readonly RegionMapper $regionMapper,
    ) {
    }

    /**
     * @throws Exception
     */
    public function fromModel(Activity $model): ActivityDto
    {
        // Features
        $features = [];
        foreach ($model->getFeatures() ?? [] as $featureId) {
            $feature = $this->featureRepository->findById($featureId);

            if (!$feature instanceof Feature) {
                continue;
            }

            $features[] = $this->featureMapper->fromModel($feature);
        }

        // Regions
        $regions = [];
        foreach ($model->getRegions() ?? [] as $region) {
            $regions[] = $this->regionMapper->fromModel($region);
        }

        return new ActivityDto(
            id: $model->getId(),
            activityType: $model->getActivityType(),
            title: $model->getTitle(),
            date: $model->getDate(),
            regions: $regions,
            features: $features,
            weather: $model->getWeather(),
            temperature: $model->getTemperature(),
        );
    }
}
