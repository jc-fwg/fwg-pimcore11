<?php

declare(strict_types=1);

namespace App\Mapper;

use App\Adapter\App\Database\Doctrine\Repository\AuthorRepository;
use App\Dto\BlogpostDto;
use App\Service\BlogpostService;
use App\Website\LinkGenerator\BlogpostLinkGenerator;
use Pimcore\Model\DataObject\Activity;
use Pimcore\Model\DataObject\Author;
use Pimcore\Model\DataObject\Blogpost;
use Pimcore\Model\DataObject\Category;

class BlogpostMapper
{
    public function __construct(
        private readonly ActivityMapper $activityMapper,
        private readonly AuthorRepository $authorRepository,
        private readonly AuthorMapper $authorMapper,
        private readonly BlogpostLinkGenerator $blogpostLinkGenerator,
        private readonly BlogpostService $blogpostService,
    ) {
    }

    public function fromModel(Blogpost $model): BlogpostDto
    {
        $dto = new BlogpostDto(
            id: $model->getId(),
            publicationDate: $model->getPublicationDate(),
            blogpostType: $model->getBlogpostType(),
            imageMain: $model->getImageMain(),
            assetsFolder: $model->getAssetsFolder(),
            previewText: $model->getPreviewText(),
            imageTeaser: $model->getImageTeaser(),
            title: $model->getTitle(),
            subTitle: $model->getSubTitle(),
            content: $model->getContent(),
            metaTitle: $model->getMetaTitle(),
            metaDescription: $model->getMetaDescription(),
            hashtags: $model->getHashtags(),
            hashtagsCalculated: $model->getHashtagsCalculated(),
            detailLink: $this->blogpostLinkGenerator->generate($model),
        );

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
            if (!$category instanceof Category) {
                continue;
            }

            $dto->categories[] = $category;
        }

        // Activity
        $activity = $model->getActivity();
        if ($activity instanceof Activity) {
            $dto->activity = $this->activityMapper->fromModel($activity);
            $dto->badges   = $this->blogpostService->getBadges($dto->activity);
        }

        return $dto;
    }
}
