<?php

namespace App\OpenAI;

class ChatService
{
    //public function __construct(private readonly string $openAiApiKey) {}
    public function __construct(private readonly string $openAiApiKey) {}

    public function ask(string $prompt): string
    {
        $client = \OpenAI::client($this->openAiApiKey);
        return $client->responses()->create([
            'model' => 'gpt-4o',
            'input' => $prompt,
        ])->outputText;
    }

    public function chat(): void
    {

    }
}
