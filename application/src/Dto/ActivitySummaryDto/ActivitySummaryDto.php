<?php

declare(strict_types=1);

namespace App\Dto\ActivitySummaryDto;

use App\Dto\ActivitySummaryDto\Interface\ActivitySummaryTypeInterface;

class ActivitySummaryDto implements ActivitySummaryTypeInterface
{
    public function __construct(
        public ?float $duration = null,
        public ?string $breaks = null,
    ) {
    }
}
