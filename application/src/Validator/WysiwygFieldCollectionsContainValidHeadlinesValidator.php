<?php

declare(strict_types=1);

namespace App\Validator;

use App\Dto\BlogpostDto;
use Pimcore\Model\DataObject\Fieldcollection;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;

class WysiwygFieldCollectionsContainValidHeadlinesValidator extends ConstraintValidator
{
    public function validate($value, Constraint $constraint): void
    {
        if (!$constraint instanceof WysiwygFieldCollectionsContainValidHeadlines) {
            throw new UnexpectedTypeException($constraint, WysiwygFieldCollectionsContainValidHeadlines::class);
        }

        if (!$value instanceof BlogpostDto) {
            throw new UnexpectedTypeException($value, BlogpostDto::class);
        }

        $contents = $value->content;

        if (!$contents instanceof Fieldcollection) {
            return;
        }

        foreach ($contents->getItems() as $content) {
            if (!$content instanceof Fieldcollection\Data\ContentWysiwyg) {
                continue;
            }

            if ((bool) preg_match('/<h1>.*<\/h1>|<h2>.*<\/h2>/', $content->getWysiwyg() ?? '') === true) {
                $this->context
                    ->buildViolation(sprintf($constraint->message, substr(strip_tags($content->getWysiwyg()), 0, 20)))
                    ->atPath('WYSIWYG')
                    ->addViolation();
            }
        }
    }
}
