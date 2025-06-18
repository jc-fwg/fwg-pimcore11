<?php

declare(strict_types=1);

namespace App\Dto\ActivitySummaryDto;

class Hike extends ActivitySummaryDto
{
    public function __construct(
        public ?float $duration = null,
        public ?string $breaks = null,
        public ?float $distance = null,
        public ?int $elevation = null,
        public ?string $difficulty = null,
        public ?string $headForHeights = null,
        public ?string $sureFootness = null,
    ) {
        parent::__construct(
            duration: $duration,
            breaks: $breaks,
        );
    }
}
