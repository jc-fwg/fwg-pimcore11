<?php

declare(strict_types=1);

namespace App\Dto\ActivitySummaryDto;

class Bike extends ActivitySummaryDto
{
    public function __construct(
        public ?float $duration = null,
        public ?string $breaks = null,
        public ?float $distance = null,
        public ?int $elevation = null,
        public ?string $stsFrom = null,
        public ?string $stsTo = null,
    ) {
        parent::__construct(
            duration: $duration,
            breaks: $breaks,
        );
    }
}
