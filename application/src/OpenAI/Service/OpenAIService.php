<?php

declare(strict_types=1);

namespace App\OpenAI\Service;

use App\OpenAI\Agent\BlogpostAgent;
use App\OpenAI\Agent\BlogpostChatAgent;
use App\OpenAI\Agent\CollectionChatAgent;

readonly class OpenAIService
{
    public function __construct(
        private CollectionChatAgent $collectionChatAgent,
        private BlogpostChatAgent $blogpostChatAgent,
        private BlogpostAgent $blogpostAgent,
    ) {
    }

    public function collectionChat(): CollectionChatAgent
    {
        return $this->collectionChatAgent;
    }

    public function blogpostChat(): BlogpostChatAgent
    {
        return $this->blogpostChatAgent;
    }

    public function blogpost(): BlogpostAgent
    {
        return $this->blogpostAgent;
    }
}
