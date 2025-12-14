<?php

namespace App\Sitemap;

use App\Adapter\App\Database\Doctrine\Repository\BlogpostRepository;
use Pimcore\Bundle\SeoBundle\Sitemap\Element\AbstractElementGenerator;
use Pimcore\Bundle\SeoBundle\Sitemap\Element\GeneratorContext;
use Pimcore\Model\DataObject\Blogpost;
use Presta\SitemapBundle\Service\UrlContainerInterface;
use Presta\SitemapBundle\Sitemap\Url\Url;
use Presta\SitemapBundle\Sitemap\Url\UrlConcrete;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use function Sabre\Event\Loop\instance;

class BlogpostGenerator extends AbstractElementGenerator
{
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

            $linkGenerator = $blogpost->getClass()->getLinkGenerator();
            $link = $blogpost->getClass()->getLinkGenerator()->generate($blogpost, ['referenceType' => UrlGeneratorInterface::ABSOLUTE_URL]);

            $url = new UrlConcrete($link);

            $url = $this->process($url, $blogpost, $context);

            if (!$url instanceof Url) {
                continue;
            }

            $urlContainer->addUrl($url, $section ?? 'blogposts');
        }
    }
}
