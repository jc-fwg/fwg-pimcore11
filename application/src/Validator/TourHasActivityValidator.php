<?php

declare(strict_types=1);

namespace App\Validator;

use App\Dto\ActivityDto;
use App\Dto\BlogpostDto;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;

class TourHasActivityValidator extends ConstraintValidator
{
    public function validate($value, Constraint $constraint): void
    {
        if (!$constraint instanceof TourHasActivity) {
            throw new UnexpectedTypeException($constraint, TourHasActivity::class);
        }

        if (!$value instanceof BlogpostDto) {
            throw new UnexpectedTypeException($value, BlogpostDto::class);
        }

        if ($value->blogpostType === 'tour' && !$value->activity instanceof ActivityDto) {
            $this->context
                ->buildViolation($constraint->message)
                ->atPath('activity')
                ->addViolation();
        }
    }
}
