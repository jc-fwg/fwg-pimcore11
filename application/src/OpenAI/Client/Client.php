<?php

declare(strict_types=1);

namespace App\OpenAI\Client;

use App\OpenAI\Agent\AbstractChatAgent;
use OpenAI;
use OpenAI\Responses\Chat\CreateResponse as ChatCreateResponse;
use OpenAI\Responses\Responses\CreateResponse;

readonly class Client
{
    private const string MODEL_GPT4O      = 'gpt-4o';
    private const string MODEL_GPT4O_MINI = 'gpt-4o-mini';
    private const string MODEL_GPT5_MINI  = 'gpt-5-mini';

    private \OpenAI\Client $client;

    public function __construct(private string $openAiApiKey)
    {
        $this->client = OpenAI::client($this->openAiApiKey);
    }

    public function ask(string $prompt): CreateResponse
    {
        return $this->client->responses()->create([
            'model' => self::MODEL_GPT5_MINI,
            'input' => $prompt,
        ]);
    }

    public function chat(AbstractChatAgent $agent): ChatCreateResponse
    {
        return $this->client->chat()->create([
            'model'           => self::MODEL_GPT5_MINI,
            'response_format' => ['type' => 'json_object'],
            'messages'        => $agent->getMessageBag()->getMessages(),
        ]);
    }
}
