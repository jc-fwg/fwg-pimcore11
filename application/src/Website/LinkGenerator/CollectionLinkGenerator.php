<?php

declare(strict_types=1);

namespace App\Website\LinkGenerator;

use InvalidArgumentException;
use Pimcore\Bundle\SeoBundle\Sitemap\UrlGeneratorInterface;
use Pimcore\Model\DataObject\ClassDefinition\LinkGeneratorInterface;
use Pimcore\Model\DataObject\Collection;
use Pimcore\Model\DataObject\Service;

readonly class CollectionLinkGenerator implements LinkGeneratorInterface
{
    public function __construct(
        private readonly UrlGeneratorInterface $urlGenerator,
    ) {
    }

    public function generate(object $object, array $params = []): string
    {
        if (!($object instanceof Collection)) {
            throw new InvalidArgumentException('Given object is not an collection instance');
        }

        return Service::useInheritedValues(true, fn () => $this->urlGenerator->generateUrl($object->getSlug()));
    }
}
