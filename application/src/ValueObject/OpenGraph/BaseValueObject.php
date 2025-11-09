<?php

declare(strict_types=1);

namespace App\ValueObject\OpenGraph;

abstract readonly class BaseValueObject
{
    protected const string TYP_ARTICLE = 'article';
    protected const string TYP_WEBSITE = 'website';
    protected const string SITE_NAME   = 'FreiWeg Outdoor Activity Blog';

    public function __construct(
        public string $title,
        public string $description,
        public string $image,
        public string $url,
        public string $type,
        public string $siteName = self::SITE_NAME,
    ) {
    }
}
