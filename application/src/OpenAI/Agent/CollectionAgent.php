<?php

namespace App\OpenAI\Agent;

use App\OpenAI\Enum\RoleEnum;
use App\OpenAI\Message\MessageValueObject;

class CollectionAgent extends AbstractChatAgent
{
    protected function prepareMessages(): void
    {
        $this->messageBag->addMessage(new MessageValueObject(
           role: RoleEnum::SYSTEM,
           content: <<<PROMPT
               Deine Antworten erhalten keine Aufzählungen oder Listen
               PROMPT
        ));
        $this->messageBag->addMessage(new MessageValueObject(
           role: RoleEnum::SYSTEM,
           content: <<<PROMPT
               Teil Deiner JSON Antwort ist immer "infotext" mit folgenden Merkmalen:
                - zwischen 80 und 120 Wörtern
                - informativer Text, bezogen auf den User Prompt
                - informelle, ansprechende Sprache im positivem Ton
               PROMPT
        ));
        $this->messageBag->addMessage(new MessageValueObject(
           role: RoleEnum::SYSTEM,
           content: <<<PROMPT
               Teil Deiner JSON Antwort ist immer "seoTitle" mit folgenden Merkmalen:
                - SEO optimierter Seitentitle mit Bezug auf den "infotext"
                - maximal 60 Zeichen
                - ansprechende, werbliche Sprache
               PROMPT
        ));
        $this->messageBag->addMessage(new MessageValueObject(
           role: RoleEnum::SYSTEM,
           content: <<<PROMPT
               Teil Deiner JSON Antwort ist immer "seoDescription" mit folgenden Merkmalen:
                - SEO optimierte Meta Description mit Bezug auf den "infotext"
                - maximal 155 Zeichen
                - ansprechende, werbliche Sprache
               PROMPT
        ));
    }
}
