<?php

declare(strict_types=1);

namespace App\Dto;

use Carbon\Carbon;

class ActivityDto
{
    /**
     * @param TagDto[] $tags
     */
    public function __construct(
        public readonly int $id,
        public ?string $activityType = null,
        public ?string $title = null,
        public ?Carbon $date = null,
        public ?array $locations = [],
        public ?array $tags = [],
        public ?string $weather = null,
        public ?int $temperature = null,
    ) {
    }
}
