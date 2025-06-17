<?php

declare(strict_types=1);

namespace App\Dto;

use App\Dto\ActivitySummaryDto\Interface\ActivitySummaryTypeInterface;
use Carbon\Carbon;
use Pimcore\Model\Element\AbstractElement;

class ActivityDto
{
    /**
     * @param ActivityLocationDto[] $locations
     * @param TagDto[] $tags
     */
    public function __construct(
        public readonly int $id,
        public ?string $activityType = null,
        public ?string $title = null,
        public ?Carbon $date = null,
        public ?array $locations = [],
        public ?AbstractElement $gpx = null,
        public ?array $tags = [],
        public ?string $weather = null,
        public ?int $temperature = null,
        public ?ActivitySummaryTypeInterface $summary = null,
    ) {
    }
}
