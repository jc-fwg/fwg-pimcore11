<?php

declare(strict_types=1);

namespace App\Validator;

use Attribute;
use Symfony\Component\Validator\Constraint;

#[Attribute]
class TourHasActivity extends Constraint
{
    public string $message = 'Blogposts of type "Tour" has no Activity related';

    public function getTargets(): string
    {
        return self::CLASS_CONSTRAINT;
    }
}
