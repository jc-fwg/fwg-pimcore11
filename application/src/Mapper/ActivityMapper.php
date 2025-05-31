<?php

declare(strict_types=1);

namespace App\Mapper;

use App\Adapter\App\Database\Doctrine\Repository\AuthorRepository;
use App\Dto\ActivityDto;
use App\Dto\BlogpostDto;
use App\Website\LinkGenerator\BlogpostLinkGenerator;
use Pimcore\Model\DataObject\Activity;
use Pimcore\Model\DataObject\Author;
use Pimcore\Model\DataObject\Blogpost;

class ActivityMapper
{
    public function __construct(
        private readonly AuthorRepository $authorRepository,
        private readonly AuthorMapper $authorMapper,
        private readonly BlogpostLinkGenerator $blogpostLinkGenerator
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

        $dto->isPublished = $model->isPublished();

        // Authors
        $authorsIds = $model->getAuthors() ?? [];
        foreach ($authorsIds as $authorId) {
            $author = $this->authorRepository->findOneById((int) $authorId);

            if (!$author instanceof Author) {
                continue;
            }

            $dto->authors[] = $this->authorMapper->fromModel($author);
        }

        // Categories
        $categories = $model->getCategories() ?? [];
        foreach ($categories as $category) {
            if (!$category instanceof \Pimcore\Model\DataObject\Category) {
                continue;
            }

            $dto->categories[] = $category;
        }

        return $dto;
    }
}
