<?php

namespace App\ValueObject;

use Symfony\Component\Form\FormView;
use Symfony\Component\Validator\ConstraintViolationListInterface;

readonly class BlogpostCommentValueObject
{
    public function __construct(
        private FormView                            $formView,
        private ?array                              $captcha = null,
        private bool                                $isHandled = false,
        private ?ConstraintViolationListInterface   $errors = null,
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

    public function getErrors(): ?ConstraintViolationListInterface
    {
        return $this->errors;
    }
}
