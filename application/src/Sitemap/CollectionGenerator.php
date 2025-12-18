<?php

declare(strict_types=1);

namespace App\Sitemap;

use Pimcore\Bundle\SeoBundle\Sitemap\Element\AbstractElementGenerator;
use Pimcore\Bundle\SeoBundle\Sitemap\Element\GeneratorContext;
use Pimcore\Model\DataObject\Collection\Listing;
use Presta\SitemapBundle\Service\UrlContainerInterface;
use Presta\SitemapBundle\Sitemap\Url\GoogleImage;
use Presta\SitemapBundle\Sitemap\Url\GoogleImageUrlDecorator;
use Presta\SitemapBundle\Sitemap\Url\UrlConcrete;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Routing\RouterInterface;

use function sprintf;

class CollectionGenerator extends AbstractElementGenerator
{
    public function __construct(array $filters, array $processors, private readonly RouterInterface $router)
    {
        parent::__construct($filters, $processors);
    }

    public function populate(UrlContainerInterface $urlContainer, ?string $section = null): void
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

            $decorator = new GoogleImageUrlDecorator($url);

            // Add teaser image
            $frontendPath = $collection->getImageTeaser()?->getFrontendPath();
            if ($frontendPath !== null) {
                $imageUrl = sprintf(
                    '%s://%s%s',
                    $this->router->getContext()->getScheme(),
                    $this->router->getContext()->getHost(),
                    $frontendPath
                );

                $decorator->addImage(new GoogleImage($imageUrl));
            }

            $urlContainer->addUrl($decorator, $section ?? 'collections');
        }
    }
}
