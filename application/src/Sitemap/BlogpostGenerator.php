<?php

declare(strict_types=1);

namespace App\Sitemap;

use Pimcore\Bundle\SeoBundle\Sitemap\Element\AbstractElementGenerator;
use Pimcore\Bundle\SeoBundle\Sitemap\Element\GeneratorContext;
use Pimcore\Model\DataObject\Blogpost;
use Pimcore\Model\DataObject\Fieldcollection;
use Presta\SitemapBundle\Service\UrlContainerInterface;
use Presta\SitemapBundle\Sitemap\Url\GoogleImage;
use Presta\SitemapBundle\Sitemap\Url\GoogleImageUrlDecorator;
use Presta\SitemapBundle\Sitemap\Url\UrlConcrete;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Routing\RouterInterface;

use function sprintf;

class BlogpostGenerator extends AbstractElementGenerator
{
    public function __construct(array $filters, array $processors, private readonly RouterInterface $router)
    {
        parent::__construct($filters, $processors);
    }

    public function populate(UrlContainerInterface $urlContainer, ?string $section = null): void
    {
        if ($section !== null && $section !== 'blog') {
            // do not add entries if section doesn't match
            return;
        }

        $blogpostsListing = new Blogpost\Listing();

        $context = new GeneratorContext($urlContainer, $section);

        foreach ($blogpostsListing as $blogpost) {
            if (!$this->canBeAdded($blogpost, $context)) {
                continue;
            }

            $link = $blogpost->getClass()->getLinkGenerator()->generate($blogpost, ['referenceType' => UrlGeneratorInterface::ABSOLUTE_URL]);

            $url = new UrlConcrete($link);

            // Add images
            $images = $this->getImagesFromContent($blogpost);

            $decorator = new GoogleImageUrlDecorator($url);
            foreach ($images as $imageUrl) {
                $decorator->addImage(new GoogleImage($imageUrl));
            }

            $urlContainer->addUrl($decorator, $section ?? 'blogposts');
        }
    }

    private function getImagesFromContent(Blogpost $blogpost): array
    {
        $imageUrls = [];

        $contents = $blogpost->getContent();
        if (!$contents instanceof Fieldcollection) {
            return [];
        }

        foreach ($contents as $content) {

            if (
                !$content instanceof Fieldcollection\Data\ContentGallery
                && !$content instanceof Fieldcollection\Data\ContentCitySpot
            ) {
                continue;
            }

            $images = $content->getImageGallery()?->getItems();

            foreach ($images as $image) {
                $frontendPath = $image->getImage()?->getFrontendPath();
                if ($frontendPath === null) {
                    continue;
                }

                $imageUrls[] = sprintf(
                    '%s://%s%s',
                    $this->router->getContext()->getScheme(),
                    $this->router->getContext()->getHost(),
                    $frontendPath
                );
            }
        }

        return $imageUrls;
    }
}
