<?php

namespace App\Sitemap;

use Pimcore\Bundle\SeoBundle\Sitemap\Element\AbstractElementGenerator;
use Pimcore\Bundle\SeoBundle\Sitemap\Element\GeneratorContext;
use Pimcore\Model\DataObject\Blogpost;
use Pimcore\Model\DataObject\Fieldcollection;
use Presta\SitemapBundle\Service\UrlContainerInterface;
use Presta\SitemapBundle\Sitemap\Url\Url;
use Presta\SitemapBundle\Sitemap\Url\UrlConcrete;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Routing\RouterInterface;

class BlogpostGenerator extends AbstractElementGenerator
{
    public function __construct(array $filters = [], array $processors = [], private readonly RouterInterface $router)
    {
        parent::__construct($filters, $processors);
    }

    public function populate(UrlContainerInterface $urlContainer, string $section = null): void
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

            $images = $this->getGalleryImages($blogpost);

            // todo: Decorate images

            $link = $blogpost->getClass()->getLinkGenerator()->generate($blogpost, ['referenceType' => UrlGeneratorInterface::ABSOLUTE_URL]);

            $url = new UrlConcrete($link);

            $url = $this->process($url, $blogpost, $context);

            if (!$url instanceof Url) {
                continue;
            }

            $urlContainer->addUrl($url, $section ?? 'blogposts');
        }
    }

    private function getGalleryImages(Blogpost $blogpost): array
    {
        $imageUrls = [];

        $contents = $blogpost->getContent();
        if (!$contents instanceof Fieldcollection) {
            return [];
        }

        foreach ($contents as $content) {
            if (!$content instanceof Fieldcollection\Data\ContentGallery) {
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
