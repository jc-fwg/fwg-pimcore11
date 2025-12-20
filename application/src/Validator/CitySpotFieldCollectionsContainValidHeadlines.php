<?php

declare(strict_types=1);

namespace App\Validator;

use Attribute;
use Symfony\Component\Validator\Constraint;

#[Attribute]
class CitySpotFieldCollectionsContainValidHeadlines extends Constraint
{
    public string $message = 'CitySpot content element contains H1 or H2 headlines. Title: "%s"';

    public function getTargets(): string
    {
        return self::CLASS_CONSTRAINT;
    }
}
