<?php

declare(strict_types=1);

namespace App\OpenAI\Enum;

enum RoleEnum: string
{
    case SYSTEM = 'system';
    case USER   = 'user';
}
