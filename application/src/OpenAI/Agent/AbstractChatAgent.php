<?php

declare(strict_types=1);

namespace App\OpenAI\Agent;

use App\OpenAI\Enum\RoleEnum;
use App\OpenAI\Message\MessageBag;
use App\OpenAI\Message\MessageValueObject;

abstract class AbstractChatAgent extends AbstractAgent
{
    protected readonly MessageBag $messageBag;

    public function response(string $userPrompt = ''): array
    {
        parent::response($userPrompt);

        $this->messageBag->addMessage(new MessageValueObject(
            role: RoleEnum::USER,
            content: $userPrompt
        ));

        $response = $this->client->chat($this);

        return json_decode($response->choices[0]->message->content, true);
    }

    public function getMessageBag(): MessageBag
    {
        return $this->messageBag;
    }

    abstract protected function prepareMessages(): void;

    protected function initialize(): void
    {
        $this->messageBag = new MessageBag();
        $this->messageBag->addMessage(new MessageValueObject(
            role: RoleEnum::SYSTEM,
            content: <<<'PROMPT'
                Du bist ein SEO-Experte und Texter für einen Outdoor Blog.
                Du antwortest immer auf Deutsch.
                Deine Antwort ist immer in korrektem JSON-Format.
                Deine Sprache ist immer informativ und ansprechend, im positivem Ton
                PROMPT
        ));

        $this->prepareMessages();
    }
}
