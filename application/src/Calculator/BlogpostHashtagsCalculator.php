<?php

declare(strict_types=1);

namespace App\Calculator;

use Pimcore\Model\DataObject\Blogpost;
use Pimcore\Model\DataObject\ClassDefinition\CalculatorClassInterface;
use Pimcore\Model\DataObject\Concrete;
use Pimcore\Model\DataObject\Data\CalculatedValue;
use Pimcore\Model\DataObject\HashtagSet;

class BlogpostHashtagsCalculator implements CalculatorClassInterface
{
    public function compute(Concrete $object, CalculatedValue $context): string
    {
        if (!$object instanceof Blogpost) {
            return '';
        }

        if ($context->getFieldname() !== Blogpost::FIELD_HASHTAGS_CALCULATED) {
            return '';
        }

        $hashtags[] = str_replace("\n", ' ', (string) $object->getHashtags());

        $hashtagSets = $object->getHashtagSets() ?? [];

        foreach ($hashtagSets as $hashtagSetId) {
            $hashtagSet = HashtagSet::getById($hashtagSetId);

            $hashtags[] = $hashtagSet->getHashtags();
        }

        return trim(implode(' ',
            array_filter($hashtags, static fn ($hashtags) => !empty($hashtags))
        ));
    }

    public function getCalculatedValueForEditMode(Concrete $object, CalculatedValue $context): string
    {
        return $this->compute($object, $context);
    }
}
