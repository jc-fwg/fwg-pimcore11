<?php

declare(strict_types=1);

namespace App\ValueObject;

use Symfony\Component\Form\FormView;
use Symfony\Component\Validator\ConstraintViolationListInterface;

readonly class BlogpostCommentValueObject
{
    public function __construct(
        public FormView $formView,
        public ?array $captcha = null,
        public bool $isHandled = false,
        public ?ConstraintViolationListInterface $errors = null,
    ) {
    }
}
