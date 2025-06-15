<?php

declare(strict_types=1);

namespace App\Dto;

use Carbon\Carbon;
use Pimcore\Model\Asset;
use Pimcore\Model\Asset\Folder;
use Pimcore\Model\Asset\Image;
use Pimcore\Model\DataObject\Category;
use Pimcore\Model\DataObject\Fieldcollection;

class BlogpostDto
{
    /**
     * @param AuthorDto[] $authors
     * @param Category[]  $categories
     * @param Asset[]     $downloads
     * @param LinkDto[]   $links
     */
    public function __construct(
        public readonly int $id,
        public ?Carbon $publicationDate = null,
        public ?string $blogpostType = null,
        public array $authors = [],
        public ?ActivityDto $activity = null,
        public array $categories = [],
        public ?Image $imageMain = null,
        public ?Folder $assetsFolder = null,
        public ?string $previewText = null,
        public ?Image $imageTeaser = null,
        public array $downloads = [],
        public ?array $links = [],
        public ?string $title = null,
        public ?string $subTitle = null,
        public ?Fieldcollection $content = null,
        public ?string $metaTitle = null,
        public ?string $metaDescription = null,
        public ?string $hashtags = null,
        public array $hashtagSets = [],
        public ?string $hashtagsCalculated = null,
        public ?string $detailLink = null,
    ) {
    }
}
