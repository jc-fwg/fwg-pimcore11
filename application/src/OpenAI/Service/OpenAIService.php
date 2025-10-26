<?php

declare(strict_types=1);

namespace App\OpenAI\Service;

use App\OpenAI\Agent\BlogpostAgent;
use App\OpenAI\Agent\CollectionAgent;

readonly class OpenAIService
{
    public function __construct(
        private CollectionAgent $collectionAgent,
        private BlogpostAgent $blogpostAgent,
    ) {
    }

    public function collection(): CollectionAgent
    {
        return $this->collectionAgent;
    }

    public function blogpost(): BlogpostAgent
    {
        return $this->blogpostAgent;
    }
}
