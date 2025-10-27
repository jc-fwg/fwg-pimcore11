<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;

#[\Attribute]
class BlogpostHasWysiwygAndGalleryContent extends Constraint
{
    public string $message = 'Blogposts content has no WYSIWYG and/or Gallery content blocks';

    public function getTargets(): string
    {
        return self::CLASS_CONSTRAINT;
    }
}
