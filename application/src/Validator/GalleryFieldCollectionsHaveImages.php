<?php

declare(strict_types=1);

namespace App\Validator;

use Attribute;
use Symfony\Component\Validator\Constraint;

#[Attribute]
class GalleryFieldCollectionsHaveImages extends Constraint
{
    public string $message = 'One ore more Gallery content elements are missing images';

    public function getTargets(): string
    {
        return self::CLASS_CONSTRAINT;
    }
}
