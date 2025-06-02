<?php

declare(strict_types=1);

namespace App\Mapper;

use App\Dto\ActivityDto;
use App\Dto\ActivityTagDto;
use Exception;
use Pimcore\Model\DataObject\Activity;
use Pimcore\Model\DataObject\Tag;

class ActivityMapper
{
    public function __construct(
        private readonly TagMapper $tagMapper,
    ) {
    }

    /**
     * @throws Exception
     */
    public function fromModel(Activity $model): ActivityDto
    {
        // Tags
        $tags = [];
        foreach ($model->getTags() ?? [] as $tagRelation) {

            $object = $tagRelation->getObject();

            if (!$object instanceof Tag) {
                continue;
            }

            $tag = $this->tagMapper->fromModel($object);

            $tags[] = new ActivityTagDto(
                tag: $tag,
                isHeadline: (bool) $tagRelation->getHeadline(),
            );
        }

        return new ActivityDto(
            id: $model->getId(),
            activityType: $model->getActivityType(),
            title: $model->getTitle(),
            date: $model->getDate(),
            tags: $tags,
            weather: $model->getWeather(),
            temperature: $model->getTemperature(),
        );
    }
}
