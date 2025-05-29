<?php

declare(strict_types=1);

namespace App\Dto;

use Carbon\Carbon;
use Pimcore\Model\Asset\Folder;
use Pimcore\Model\Asset\Image;
use Pimcore\Model\DataObject\Activity;
use Pimcore\Model\DataObject\Category;
use Pimcore\Model\DataObject\Fieldcollection;

class BlogpostDto extends DataModelDto
{
    /**
     * @param AuthorDto[] $authors
     * @param Category[] $categories
     */
    public function __construct(
        public readonly int $id,
        public ?Carbon $publicationDate = null,
        public ?string $blogpostType = null,
        public ?array $authors = null,
        public ?Activity $activity = null,
        public ?array $categories = null,
        public ?Image $imageMain = null,
        public ?Folder $assetsFolder = null,
        public ?string $previewText = null,
        public ?Image $imageTeaser = null,
        public ?string $title = null,
        public ?string $subTitle = null,
        public ?Fieldcollection $content = null,
        public ?string $metaTitle = null,
        public ?string $metaDescription = null,
        public ?string $hashtags = null,
        public ?array $hashtagSets = null,
        public ?string $hashtagsCalculated = null,
        public ?string $detailLink = null,
    )
    {
    }
}
