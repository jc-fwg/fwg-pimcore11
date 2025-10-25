<?php

namespace App\OpenAI\Agent;

use App\OpenAI\Client\Client;

abstract class AbstractAgent
{
    public function __construct(protected readonly Client $client)
    {
        $this->initialize();
    }

    protected function response(string $userPrompt): mixed
    {
        if ($userPrompt === '') {
            throw new \RuntimeException('UserPrompt may not be empty');
        }

        return null;
    }

    abstract protected function initialize(): void;
}
