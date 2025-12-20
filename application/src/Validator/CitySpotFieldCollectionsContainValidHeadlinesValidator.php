<?php

declare(strict_types=1);

namespace App\Validator;

use App\Dto\BlogpostDto;
use Pimcore\Model\DataObject\Fieldcollection;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;

class CitySpotFieldCollectionsContainValidHeadlinesValidator extends ConstraintValidator
{
    public function validate($value, Constraint $constraint): void
    {
        if (!$constraint instanceof CitySpotFieldCollectionsContainValidHeadlines) {
            throw new UnexpectedTypeException($constraint, CitySpotFieldCollectionsContainValidHeadlines::class);
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

            if ((bool) preg_match('/<h1>.*<\/h1>|<h2>.*<\/h2>/', $content->getConclusion() ?? '') === true) {

                $title = $content->getTitle() ?? '';
                if (trim($title) === '') {
                    $title = 'NO TITLE SET';
                }

                $this->context
                    ->buildViolation(sprintf($constraint->message, $title))
                    ->atPath('CitySpot')
                    ->addViolation();
            }
        }
    }
}
