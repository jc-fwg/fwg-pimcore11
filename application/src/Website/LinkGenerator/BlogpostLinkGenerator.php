<?php

declare(strict_types=1);

namespace App\Website\LinkGenerator;

use InvalidArgumentException;
use Pimcore\Bundle\SeoBundle\Sitemap\UrlGeneratorInterface;
use Pimcore\Model\DataObject\Blogpost;
use Pimcore\Model\DataObject\ClassDefinition\LinkGeneratorInterface;
use Pimcore\Model\DataObject\Service;

readonly class BlogpostLinkGenerator implements LinkGeneratorInterface
{
    public function __construct(
        private readonly UrlGeneratorInterface $urlGenerator,
    )
    {
    }

    public function generate(object $object, array $params = []): string
    {
        if (!($object instanceof Blogpost)) {
            throw new InvalidArgumentException('Given object is not an blogpost instance');
        }

        return Service::useInheritedValues(true, function () use ($object, $params) {
            return $this->urlGenerator->generateUrl($object->getSlug());
        });
    }
}
