<?php

declare(strict_types=1);

namespace App\OpenAI\Service;

use App\OpenAI\Agent\CollectionAgent;

readonly class OpenAIService
{
    public function __construct(
        private CollectionAgent $collectionAgent,
    ) {
    }

    public function collection(): CollectionAgent
    {
        return $this->collectionAgent;
    }
}
