<?php

declare(strict_types=1);

namespace App\Service;

use Pimcore\Model\DataObject;
use Symfony\Component\String\Slugger\SluggerInterface;

class BlogpostService
{
    public function __construct(
        private readonly SluggerInterface $slugger
    )
    {
    }

    public function setSlug(DataObject\Blogpost $blogpost): void
    {
        $slug = [];
        $slug[] = $blogpost->getHeadline();

        $blogpost->setSlug($this->slugger->slug(implode(' ', $slug))->toString());
    }
}
