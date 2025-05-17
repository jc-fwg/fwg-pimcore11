<?php

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

        $hashtags[] = $object->getHashtags();

        $hashtagSets = $object->getHashtagSets() ?? [];

        foreach ($hashtagSets as $hashtagSetId) {

            $hashtagSet = HashtagSet::getById($hashtagSetId);

            $hashtags[] = $hashtagSet->getHashtags();
        }

        return implode(' ',
            array_filter($hashtags, function ($hashtags) {
                return !empty($hashtags);
            })
        );
    }

    public function getCalculatedValueForEditMode(Concrete $object, CalculatedValue $context): string
    {
        return $this->compute($object, $context);
    }
}
