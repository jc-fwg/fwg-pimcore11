<?php

declare(strict_types=1);

namespace App\Service;

use App\Adapter\App\Database\Doctrine\Repository\TagRepository;
use Pimcore\Model\DataObject;
use Pimcore\Model\Element\ValidationException;
use Pimcore\Model\Exception\NotFoundException;
use Symfony\Component\String\Slugger\SluggerInterface;

use function sprintf;

readonly class TagService
{
    public function __construct(
        private SluggerInterface $slugger,
        private TagRepository $tagRepository,
    ) {
    }

    /**
     * @throws ValidationException
     */
    public function setSlug(DataObject\Concrete $tag): void
    {
        /** @var DataObject\Tag|DataObject\TagCategory $tag */
        $slug = $this->slugger->slug($tag->getName())->lower()->toString();

        try {
            $tag = $this->tagRepository->getBySlug($slug);
            throw new ValidationException(sprintf('Tag with slug "%s" already exists', $slug));
        } catch (NotFoundException) {
        }

        $tag->setSlug($slug);
    }
}
