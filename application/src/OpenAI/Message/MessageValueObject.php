<?php

namespace App\OpenAI\Message;

use App\OpenAI\Enum\RoleEnum;

readonly class MessageValueObject
{
    public function __construct(
        public RoleEnum $role,
        public string $content = '',
    )
    {
        if ($this->content === '') {
            throw new \InvalidArgumentException('Content may be empty');
        }
    }
}
