<?php

declare(strict_types=1);

namespace App\Validator;

use Attribute;
use Symfony\Component\Validator\Constraint;

#[Attribute]
class BlogpostHasRelevantContent extends Constraint
{
    public string $message = 'Blogposts content has no WYSIWYG and/or Gallery nor CitySpots content';

    public function getTargets(): string
    {
        return self::CLASS_CONSTRAINT;
    }
}
