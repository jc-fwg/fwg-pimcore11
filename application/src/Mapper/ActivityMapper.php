<?php

declare(strict_types=1);

namespace App\Mapper;

use App\Adapter\App\Database\Doctrine\Repository\TagRepository;
use App\Dto\ActivityDto;
use App\Dto\TagDto;
use Exception;
use Pimcore\Model\DataObject\Activity;

class ActivityMapper
{
    public function __construct(
        private readonly TagMapper $tagMapper,
        private readonly TagRepository $tagRepository,
    ) {
    }

    /**
     * @throws Exception
     */
    public function fromModel(Activity $model): ActivityDto
    {
        // Tags
        $tagDtos = [];
        $tagIds = [];
        foreach ($model->getTags() ?? [] as $tag) {
            $tagIds[] = (int) $tag->getId();
        }
        $tags = $this->tagRepository->findAllOrderedByTagCategoryWeighting($tagIds);

        foreach ($tags as $tag) {
            $tagDtos[] = new TagDto(
                id: $tag['oo_id'],
                name: $tag['name'],
                emoji: $tag['emoji'],
            );
        }

        return new ActivityDto(
            id: $model->getId(),
            activityType: $model->getActivityType(),
            title: $model->getTitle(),
            date: $model->getDate(),
            gpx: $model->getGpx(),
            tags: $tagDtos,
            weather: $model->getWeather(),
            temperature: $model->getTemperature(),
        );
    }
}
