<?php

declare(strict_types=1);

namespace App\Validator;

use App\Dto\BlogpostDto;
use Pimcore\Model\DataObject\Fieldcollection;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;

class CitySpotFieldCollectionsHaveImagesValidator extends ConstraintValidator
{
    public function validate($value, Constraint $constraint): void
    {
        if (!$constraint instanceof CitySpotFieldCollectionsHaveImages) {
            throw new UnexpectedTypeException($constraint, CitySpotFieldCollectionsHaveImagesValidator::class);
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

            $images = $content->getImageGallery()?->getItems();

            if (is_array($images) === false || count($images) === 0) {
                $this->context
                ->buildViolation($constraint->message)
                ->atPath('CitySpot')
                ->addViolation();
            }
        }
    }
}
