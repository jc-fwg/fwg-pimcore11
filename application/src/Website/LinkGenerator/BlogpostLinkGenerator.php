<?php

declare(strict_types=1);

namespace App\Website\LinkGenerator;

use InvalidArgumentException;
use Pimcore\Bundle\SeoBundle\Sitemap\UrlGeneratorInterface;
use Pimcore\Bundle\UuidBundle\Model\Tool\UUID;
use Pimcore\Model\DataObject\Blogpost;
use Pimcore\Model\DataObject\ClassDefinition\LinkGeneratorInterface;
use Pimcore\Model\DataObject\Service;
use Pimcore\Tool\Admin;

use function sprintf;

readonly class BlogpostLinkGenerator implements LinkGeneratorInterface
{
    public function __construct(
        private readonly UrlGeneratorInterface $urlGenerator,
    ) {
    }

    public function generate(object $object, array $params = []): string
    {
        if (!($object instanceof Blogpost)) {
            throw new InvalidArgumentException('Given object is not an blogpost instance');
        }

        $url = Service::useInheritedValues(true, fn () => $this->urlGenerator->generateUrl($object->getSlug()));

        if (Admin::getCurrentUser()?->isAdmin() === true) {
            $url = sprintf('%s?preview=%s', $url, UUID::getByItem($object)->getUuid());
        }

        return $url;
    }
}
