<?php

declare(strict_types=1);

namespace App\Validator;

use Attribute;
use Symfony\Component\Validator\Constraint;

#[Attribute]
class BlogpostExternalUrlsAreValid extends Constraint
{
    public string $message = 'Blogposts has broken external links';

    public function getTargets(): string
    {
        return self::CLASS_CONSTRAINT;
    }
}
