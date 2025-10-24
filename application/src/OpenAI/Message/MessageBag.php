<?php

namespace App\OpenAI\Message;

class MessageBag
{
    /** @var MessageValueObject[]  */
    private array $messages = [];

    public function addMessage(MessageValueObject $message): void
    {
        $this->messages[] = $message;
    }

    /** @return array<int, array{role: string, content: string}> */
    public function getMessages(): array
    {
        return array_map(
            fn ($message) => [
                'role' => $message->role->value,
                'content' => $message->content,
            ],
            $this->messages
        );
    }
}
