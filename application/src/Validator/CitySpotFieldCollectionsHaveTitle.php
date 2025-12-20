<?php

declare(strict_types=1);

namespace App\Validator;

use Attribute;
use Symfony\Component\Validator\Constraint;

#[Attribute]
class CitySpotFieldCollectionsHaveTitle extends Constraint
{
    public string $message = 'One ore more CitySpot content elements are missing title';

    public function getTargets(): string
    {
        return self::CLASS_CONSTRAINT;
    }
}
