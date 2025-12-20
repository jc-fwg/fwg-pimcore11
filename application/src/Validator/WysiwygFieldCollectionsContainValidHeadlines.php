<?php

declare(strict_types=1);

namespace App\Validator;

use Attribute;
use Symfony\Component\Validator\Constraint;

#[Attribute]
class WysiwygFieldCollectionsContainValidHeadlines extends Constraint
{
    public string $message = 'WYSIWYG content element contains H1 or H2 headlines. Content: "%s..."';

    public function getTargets(): string
    {
        return self::CLASS_CONSTRAINT;
    }
}
