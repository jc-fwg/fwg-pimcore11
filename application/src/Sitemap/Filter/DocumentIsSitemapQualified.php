<?php

declare(strict_types=1);

namespace App\Sitemap\Filter;

use Pimcore\Bundle\SeoBundle\Sitemap\Element\FilterInterface;
use Pimcore\Bundle\SeoBundle\Sitemap\Element\GeneratorContextInterface;
use Pimcore\Model\Document\Page;
use Pimcore\Model\Element\ElementInterface;

class DocumentIsSitemapQualified implements FilterInterface
{
    public function canBeAdded(ElementInterface $element, GeneratorContextInterface $context): bool
    {
        if (!$element instanceof Page) {
            return false;
        }

        $addToSitemap = $element->hasProperty('addToSitemap') && (bool) $element->getProperty('addToSitemap') === true;
        if ($addToSitemap === false) {
            return false;
        }

        if (empty($element->getPrettyUrl())) {
            return false;
        }

        return true;
    }

    public function handlesChildren(ElementInterface $element, GeneratorContextInterface $context): bool
    {
        return true;
    }
}
