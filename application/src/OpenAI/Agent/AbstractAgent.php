<?php

declare(strict_types=1);

namespace App\OpenAI\Agent;

use App\OpenAI\Client\Client;
use RuntimeException;

abstract class AbstractAgent
{
    public function __construct(protected readonly Client $client)
    {
        $this->initialize();
    }

    protected function response(string $prompt): mixed
    {
        if ($prompt === '') {
            throw new RuntimeException('UserPrompt may not be empty');
        }

        return null;
    }

    abstract protected function initialize(): void;
}
