<?php

namespace App\Sitemap;

use Pimcore\Bundle\SeoBundle\Sitemap\Element\AbstractElementGenerator;
use Pimcore\Bundle\SeoBundle\Sitemap\Element\GeneratorContext;
use Pimcore\Model\DataObject\Collection\Listing;
use Presta\SitemapBundle\Service\UrlContainerInterface;
use Presta\SitemapBundle\Sitemap\Url\Url;
use Presta\SitemapBundle\Sitemap\Url\UrlConcrete;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class CollectionGenerator extends AbstractElementGenerator
{
    public function populate(UrlContainerInterface $urlContainer, string $section = null): void
    {
        if ($section !== null && $section !== 'collection') {
            // do not add entries if section doesn't match
            return;
        }

        $collectionListing = new Listing();

        $context = new GeneratorContext($urlContainer, $section);

        foreach ($collectionListing as $collection) {

            if (!$this->canBeAdded($collection, $context)) {
                continue;
            }

            $link = $collection->getClass()->getLinkGenerator()->generate($collection, ['referenceType' => UrlGeneratorInterface::ABSOLUTE_URL]);

            $url = new UrlConcrete($link);

            $url = $this->process($url, $collection, $context);

            if (!$url instanceof Url) {
                continue;
            }

            $urlContainer->addUrl($url, $section ?? 'collections');
        }
    }
}
