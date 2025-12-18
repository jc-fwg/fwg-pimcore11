<?php

namespace App\Sitemap;

use Pimcore\Bundle\SeoBundle\Sitemap\Element\AbstractElementGenerator;
use Pimcore\Bundle\SeoBundle\Sitemap\Element\GeneratorContext;
use Pimcore\Model\Document;
use Presta\SitemapBundle\Service\UrlContainerInterface;
use Presta\SitemapBundle\Sitemap\Url\Url;
use Presta\SitemapBundle\Sitemap\Url\UrlConcrete;
use Symfony\Component\Routing\RouterInterface;

class DocumentGenerator extends AbstractElementGenerator
{
    public function __construct(array $filters = [], array $processors = [], private readonly RouterInterface $router)
    {
        parent::__construct($filters, $processors);
    }

    public function populate(UrlContainerInterface $urlContainer, string $section = null): void
    {
        if ($section !== null && $section !== 'documents') {
            // do not add entries if section doesn't match
            return;
        }

        $documents = new Document\Listing();

        $context = new GeneratorContext($urlContainer, $section);

        foreach ($documents as $document) {

            if (!$this->canBeAdded($document, $context)) {
                continue;
            }

            /** @var \Pimcore\Model\Document\Page $document */
            $link = sprintf(
                '%s://%s%s',
                $this->router->getContext()->getScheme(),
                $this->router->getContext()->getHost(),
                $document->getPrettyUrl()
            );

            $url = new UrlConcrete($link);

            $urlContainer->addUrl($url, $section ?? 'documents');
        }
    }
}
