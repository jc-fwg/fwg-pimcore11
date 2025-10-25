<?php

namespace App\OpenAI\Client;

use App\OpenAI\Agent\AbstractChatAgent;
use OpenAI\Responses\Responses\CreateResponse;
use OpenAI\Responses\Chat\CreateResponse as ChatCreateResponse;

readonly class Client
{
    private const string MODEL_GPT4O      = 'gpt-4o';
    private const string MODEL_GPT4O_MINI = 'gpt-4o-mini';

    private \OpenAI\Client $client;

    public function __construct(private string $openAiApiKey)
    {
        $this->client = \OpenAI::client($this->openAiApiKey);
    }

    public function ask(string $prompt): CreateResponse
    {
        return $this->client->responses()->create([
            'model' => self::MODEL_GPT4O,
            'input' => $prompt,
        ]);
    }

    public function chat(AbstractChatAgent $agent): ChatCreateResponse
    {
        return $this->client->chat()->create([
            'model' => self::MODEL_GPT4O_MINI,
            'response_format' => ['type' => 'json_object'],
            'messages' => $agent->getMessageBag()->getMessages(),
        ]);
    }
}
