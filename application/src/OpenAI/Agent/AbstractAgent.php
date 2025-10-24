<?php

namespace App\OpenAI\Agent;

use App\OpenAI\Client\Client;
use App\OpenAI\Enum\RoleEnum;
use App\OpenAI\Message\MessageBag;
use App\OpenAI\Message\MessageValueObject;

abstract class AbstractAgent
{
    protected readonly MessageBag $messageBag;

    public function __construct(protected readonly Client $client)
    {
        $this->messageBag = new MessageBag();
        $this->initialize();
        $this->prepareMessages();
    }

    private function initialize(): void
    {
        $this->messageBag->addMessage(new MessageValueObject(
            role: RoleEnum::SYSTEM,
            content: <<<PROMPT
                Du bist ein SEO-Experte und Texter für einen Outdoor Blog.
                Du antwortest immer auf Deutsch.
                Deine Antwort ist immer in korrektem JSON-Format.
                Deine Sprache ist immer informativ und ansprechend, im positivem Ton
                PROMPT
        ));
    }

    abstract protected function prepareMessages(): void;

    public function process(string $userPrompt = ''): void
    {
        if ($userPrompt === '') {
            throw new \RuntimeException('UserPrompt may not be empty');
        }
    }

    public function getMessageBag(): MessageBag
    {
        return $this->messageBag;
    }
}
