<?php

namespace App\OpenAI\Enum;

enum RoleEnum: string
{
    case SYSTEM = 'system';
    case USER = 'user';
}
