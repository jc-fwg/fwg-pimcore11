<?php

declare(strict_types=1);

namespace App\Mapper;

use App\Adapter\App\Database\Doctrine\Repository\TagRepository;
use App\Dto\ActivityDto;
use App\Dto\ActivityLocationDto;
use App\Dto\ActivitySummaryDto\ActivitySummaryDto;
use App\Dto\ActivitySummaryDto\Hike;
use App\Dto\ActivitySummaryDto\Interface\ActivitySummaryTypeInterface;
use App\Dto\LinkDto;
use Exception;
use Pimcore\Model\DataObject\Activity;
use Pimcore\Model\DataObject\Data\Link;
use Pimcore\Model\DataObject\Fieldcollection\Data\Location;
use Pimcore\Model\DataObject\SelectOptions\ActivityType;

class ActivityMapper
{
    public function __construct(
        private readonly TagCategoryMapper $tagCategoryMapper,
        private readonly TagRepository $tagRepository,
        private readonly TagMapper $tagMapper,
    ) {
    }

    /**
     * @throws Exception
     */
    public function fromModel(Activity $model): ActivityDto
    {
        // Summary : Locations
        $locations = [];
        foreach ($model->getLocations() ?? [] as $location) {
            if (!$location instanceof Location) {
                continue;
            }

            $link    = $location->getLink();
            $linkDto = null;

            if ($link instanceof Link) {
                $linkDto = new LinkDto(
                    text: $link->getText(),
                    path: $link->getPath(),
                );
            }

            $locations[] = new ActivityLocationDto(
                locationType: $location->getLocationType(),
                name: $location->getName(),
                link: $linkDto
            );
        }

        // Tags
        $tagDtos = [];
        $tagIds  = [];
        foreach ($model->getTags() ?? [] as $tag) {
            $tagIds[] = (int) $tag->getId();
        }
        $tags = $this->tagRepository->findAllOrderedByTagCategoryWeighting($tagIds);

        foreach ($tags as $tag) {
            $tagDtos[] = $this->tagMapper->fromModel($tag);
        }

        return new ActivityDto(
            id: $model->getId(),
            activityType: $model->getActivityType(),
            title: $model->getTitle(),
            date: $model->getDate(),
            locations: $locations,
            gpx: $model->getGpx(),
            tags: $tagDtos,
            weather: $model->getWeather(),
            temperature: $model->getTemperature(),
            summary: $this->getSummary($model),
        );
    }

    private function getSummary(Activity $model): ActivitySummaryTypeInterface
    {
        $summaryDto = new ActivitySummaryDto(
            duration: $model->getDuration(),
            breaks: $model->getBreaks(),
        );

        $summaryDto = match ($model->getActivityType()) {
            ActivityType::hike->value => $this->mapHike($model),
        };

        // Type dependent summary
        match ($model->getActivityType()) {
            ActivityType::hike->value => $this->mapHike($model, $summaryDto),
        };

        return $summaryDto;
    }

    private function mapHike(Activity $model): ActivitySummaryTypeInterface
    {
        $summary = $model->getSummary()->getActivityHike();

        return new Hike(
            duration: $model->getDuration(),
            breaks: $model->getBreaks(),
            distance: $summary->getDistance(),
            elevation: $summary->getElevation(),
            difficulty: $summary->getDifficulty(),
            headForHeights: $summary->getHeadForHeights(),
            sureFootness: $summary->getSurefootedness(),
        );
    }
}
