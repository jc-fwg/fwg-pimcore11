<?php

declare(strict_types=1);

namespace App\OpenAI\Message;

use App\OpenAI\Enum\RoleEnum;
use InvalidArgumentException;

readonly class MessageValueObject
{
    public function __construct(
        public RoleEnum $role,
        public string $content = '',
    ) {
        if ($this->content === '') {
            throw new InvalidArgumentException('Content may be empty');
        }
    }
}
