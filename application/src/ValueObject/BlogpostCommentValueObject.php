<?php

namespace App\ValueObject;

use Symfony\Component\Form\FormView;

readonly class BlogpostCommentValueObject
{
    public function __construct(
        private FormView $formView,
        private ?array   $captcha = null,
        private bool     $isHandled = false,
    )
    {
    }

    public function getFormView(): FormView
    {
        return $this->formView;
    }

    public function getCaptcha(): ?array
    {
        return $this->captcha;
    }

    public function isHandled(): bool
    {
        return $this->isHandled;
    }
}
