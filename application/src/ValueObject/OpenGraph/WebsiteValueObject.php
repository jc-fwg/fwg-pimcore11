<?php

declare(strict_types=1);

namespace App\ValueObject\OpenGraph;

final readonly class WebsiteValueObject extends BaseValueObject
{
    public function __construct(
        string $title,
        string $description,
        string $image,
        string $url,
    ) {
        parent::__construct(
            $title,
            $description,
            $image,
            $url,
            self::TYPE_WEBSITE,
        );
    }
}
