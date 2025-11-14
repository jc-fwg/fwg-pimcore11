<?php

declare(strict_types=1);

namespace App\Dto;

use App\Validator as AppAssert;
use Carbon\Carbon;
use Pimcore\Model\Asset;
use Pimcore\Model\Asset\Folder;
use Pimcore\Model\Asset\Image;
use Pimcore\Model\DataObject\Category;
use Pimcore\Model\DataObject\Comment;
use Pimcore\Model\DataObject\Fieldcollection;
use Symfony\Component\Validator\Constraints as Assert;

#[AppAssert\TourHasActivity(groups: [BlogpostDto::VALIDATION_GROUP_DATA_QUALITY_BASE_DATA])]
#[AppAssert\BlogpostHasWysiwygAndGalleryContent(groups: [BlogpostDto::VALIDATION_GROUP_DATA_QUALITY_CONTENT])]
class BlogpostDto
{
    public const string VALIDATION_GROUP_DATA_QUALITY_BASE_DATA              = 'data-quality-base-data';
    public const string VALIDATION_GROUP_DATA_QUALITY_ASSETS_DOWNLOADS_LINKS = 'data-quality-assets-downloads-links';
    public const string VALIDATION_GROUP_DATA_QUALITY_CONTENT                = 'data-quality-content';
    public const string VALIDATION_GROUP_DATA_QUALITY_SEO                    = 'data-quality-seo';

    /**
     * @param AuthorDto[] $authors
     * @param Category[]  $categories
     * @param Asset[]     $downloads
     * @param LinkDto[]   $links
     * @param Comment[]   $comments
     */
    public function __construct(
        public readonly int $id,

        #[Assert\NotBlank(groups: [self::VALIDATION_GROUP_DATA_QUALITY_BASE_DATA])]
        public ?string $slug = null,
        public ?string $wordPressSlug = null,

        #[Assert\NotNull(groups: [self::VALIDATION_GROUP_DATA_QUALITY_BASE_DATA])]
        #[Assert\DateTime(groups: [self::VALIDATION_GROUP_DATA_QUALITY_BASE_DATA])]
        public ?Carbon $publicationDate = null,

        #[Assert\NotNull(groups: [self::VALIDATION_GROUP_DATA_QUALITY_BASE_DATA])]
        #[Assert\NotBlank(groups: [self::VALIDATION_GROUP_DATA_QUALITY_BASE_DATA])]
        public ?string $blogpostType = null,

        #[Assert\NotNull(groups: [self::VALIDATION_GROUP_DATA_QUALITY_BASE_DATA])]
        #[Assert\NotBlank(groups: [self::VALIDATION_GROUP_DATA_QUALITY_BASE_DATA])]
        public array $authors = [],
        public ?ActivityDto $activity = null,
        public array $categories = [],

        #[Assert\NotNull(groups: [self::VALIDATION_GROUP_DATA_QUALITY_ASSETS_DOWNLOADS_LINKS])]
        public ?Image $imageMain = null,

        #[Assert\NotNull(groups: [self::VALIDATION_GROUP_DATA_QUALITY_ASSETS_DOWNLOADS_LINKS])]
        public ?Image $socialPreviewThumbnail = null,

        public ?Folder $assetsFolder = null,

        #[Assert\NotBlank(groups: [self::VALIDATION_GROUP_DATA_QUALITY_CONTENT])]
        public ?string $previewText = null,

        #[Assert\NotNull(groups: [self::VALIDATION_GROUP_DATA_QUALITY_ASSETS_DOWNLOADS_LINKS])]
        public ?Image $imageTeaser = null,
        public array $downloads = [],
        public ?array $links = [],

        #[Assert\NotBlank(groups: [self::VALIDATION_GROUP_DATA_QUALITY_CONTENT])]
        public ?string $title = null,

        #[Assert\NotBlank(groups: [self::VALIDATION_GROUP_DATA_QUALITY_CONTENT])]
        public ?string $subTitle = null,
        public ?Fieldcollection $content = null,

        #[Assert\NotBlank(groups: [self::VALIDATION_GROUP_DATA_QUALITY_SEO])]
        public ?string $focusKeyword = null,

        #[Assert\NotBlank(groups: [self::VALIDATION_GROUP_DATA_QUALITY_SEO])]
        public ?string $metaTitle = null,

        #[Assert\NotBlank(groups: [self::VALIDATION_GROUP_DATA_QUALITY_SEO])]
        public ?string $metaDescription = null,
        public ?string $hashtags = null,
        public array $hashtagSets = [],
        public ?string $hashtagsCalculated = null,
        public ?string $detailLink = null,
        public ?array $comments = [],
    ) {
    }
}
