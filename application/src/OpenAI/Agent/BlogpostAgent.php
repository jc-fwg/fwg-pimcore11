<?php

declare(strict_types=1);

namespace App\OpenAI\Agent;

use OpenAI\Responses\Responses\CreateResponse;

class BlogpostAgent extends AbstractAgent
{
    public function response(string $prompt): CreateResponse
    {
        return $this->client->ask($prompt);
    }

    protected function initialize(): void
    {
    }
}
