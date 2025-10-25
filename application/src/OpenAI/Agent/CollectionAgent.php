<?php

declare(strict_types=1);

namespace App\OpenAI\Agent;

use App\OpenAI\Enum\RoleEnum;
use App\OpenAI\Message\MessageValueObject;

class CollectionAgent extends AbstractChatAgent
{
    protected function prepareMessages(): void
    {
        $this->messageBag->addMessage(new MessageValueObject(
            role: RoleEnum::SYSTEM,
            content: <<<'PROMPT'
                Deine Antworten erhalten keine Aufzählungen oder Listen
                PROMPT
        ));
        $this->messageBag->addMessage(new MessageValueObject(
            role: RoleEnum::SYSTEM,
            content: <<<'PROMPT'
                Teil Deiner JSON Antwort ist immer "description" mit folgenden Merkmalen:
                 - zwischen 120 und 150 Wörter
                 - informativer Text
                 - informelle, ansprechende Sprache im positivem Ton
                 - erkläre, warum sich die genannte Aktivität und Region lohnen
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
