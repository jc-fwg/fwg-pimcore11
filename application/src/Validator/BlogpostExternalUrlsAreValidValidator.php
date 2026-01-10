<?php

declare(strict_types=1);

namespace App\Validator;

use App\Dto\BlogpostDto;
use Pimcore\Model\DataObject\Fieldcollection;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;

class BlogpostExternalUrlsAreValidValidator extends ConstraintValidator
{
    public function validate($value, Constraint $constraint): void
    {
        if (!$constraint instanceof BlogpostExternalUrlsAreValid) {
            throw new UnexpectedTypeException($constraint, BlogpostExternalUrlsAreValid::class);
        }

        if (!$value instanceof BlogpostDto) {
            throw new UnexpectedTypeException($value, BlogpostDto::class);
        }

        // @todo: Implement actual URL validation logic here.

        $contentWysiwyg   = 0;
        $contentGallery   = 0;
        $contentCitySpots = 0;

        $contents = $value->content;
        if ($contents instanceof Fieldcollection) {
            foreach ($contents->getItems() as $content) {
                if ($content instanceof Fieldcollection\Data\ContentWysiwyg) {
                    ++$contentWysiwyg;
                }
                if ($content instanceof Fieldcollection\Data\ContentGallery) {
                    ++$contentGallery;
                }
                if ($content instanceof Fieldcollection\Data\ContentCitySpot) {
                    ++$contentCitySpots;
                }
            }
        }

        if (
            ($contentWysiwyg > 0 && $contentGallery > 0)
            || $contentCitySpots > 0
        ) {
            return;
        }

        $this->context
            ->buildViolation($constraint->message)
            ->atPath('Content')
            ->addViolation();
    }
}
