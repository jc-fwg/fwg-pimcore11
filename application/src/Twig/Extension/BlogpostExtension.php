<?php
declare(strict_types=1);

namespace App\Twig\Extension;

use App\Website\LinkGenerator\BlogpostLinkGenerator;
use Pimcore\Model\DataObject\Blogpost;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class BlogpostExtension extends AbstractExtension
{
    public function __construct(protected BlogpostLinkGenerator $blogpostLinkGenerator)
    {
    }

    /**
     * {@inheritdoc}
     */
    public function getFunctions(): array
    {
        return [
            new TwigFunction('app_blogpost_detail_link', [$this, 'generateLink']),
        ];
    }

    public function generateLink(Blogpost $blogpost): string
    {
        return $this->blogpostLinkGenerator->generate($blogpost, []);
    }

}

