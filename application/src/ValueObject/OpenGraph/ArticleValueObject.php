<?php

declare(strict_types=1);

namespace App\ValueObject\OpenGraph;

use Carbon\Carbon;

final readonly class ArticleValueObject extends BaseValueObject
{
    public function __construct(
        string         $title,
        string         $description,
        string         $image,
        string         $url,

        /** var string[] */
        public array   $authors,

        /** var TagDto[] */
        public array   $tags,

        public Carbon  $publishedTime,
    ) {
        parent::__construct(
            $title,
            $description,
            $image,
            $url,
            self::TYP_ARTICLE,
        );
    }
}
