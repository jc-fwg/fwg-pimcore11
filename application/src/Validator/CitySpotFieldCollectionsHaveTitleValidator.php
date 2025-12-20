<?php

declare(strict_types=1);

namespace App\Validator;

use App\Dto\BlogpostDto;
use Pimcore\Model\DataObject\Fieldcollection;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;

class CitySpotFieldCollectionsHaveTitleValidator extends ConstraintValidator
{
    public function validate($value, Constraint $constraint): void
    {
        if (!$constraint instanceof CitySpotFieldCollectionsHaveTitle) {
            throw new UnexpectedTypeException($constraint, CitySpotFieldCollectionsHaveTitle::class);
        }

        if (!$value instanceof BlogpostDto) {
            throw new UnexpectedTypeException($value, BlogpostDto::class);
        }

        $contents = $value->content;

        if (!$contents instanceof Fieldcollection) {
            return;
        }

        foreach ($contents->getItems() as $content) {
            if (!$content instanceof Fieldcollection\Data\ContentCitySpot) {
                continue;
            }

            $title = $content->getTitle() ?? '';
            if (trim($title) === '') {
                $this->context
                    ->buildViolation($constraint->message)
                    ->atPath('CitySpot')
                    ->addViolation();
            }
        }
    }
}
