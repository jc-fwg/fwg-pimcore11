<?php

declare(strict_types=1);

namespace App\OpenAI\Agent;

use App\OpenAI\Enum\RoleEnum;
use App\OpenAI\Message\MessageValueObject;

class BlogpostChatAgent extends AbstractChatAgent
{
    protected function prepareMessages(): void
    {
        $this->messageBag->addMessage(new MessageValueObject(
            role: RoleEnum::SYSTEM,
            content: <<<'PROMPT'
                Dein Ziel ist es, möglichst vor den Mitbewerbern in den Suchmaschinen zu ranken.
                Das User Prompt stellt das Fokus Keyword dar.
                Du analysierst Mitbewerber inklusive deren SEO Title und Meta Description und erstellst bessere Varianten.
                Deine Antworten erhalten keine Aufzählungen oder Listen
                PROMPT
        ));
        $this->messageBag->addMessage(new MessageValueObject(
            role: RoleEnum::SYSTEM,
            content: <<<'PROMPT'
                Teil Deiner JSON Antwort ist immer "metaTitle" mit folgenden Merkmalen:
                 - SEO optimierter Seitentitle
                 - zwischen 55 und 60 Zeichen
                 - maximal 60 Zeichen
                PROMPT
        ));
        $this->messageBag->addMessage(new MessageValueObject(
            role: RoleEnum::SYSTEM,
            content: <<<'PROMPT'
                Teil Deiner JSON Antwort ist immer "metaDescription" mit folgenden Merkmalen:
                 - SEO optimierte Meta Description
                 - zwischen 145 und 155 Zeichen
                 - maximal 155 Zeichen
                PROMPT
        ));
    }
}
