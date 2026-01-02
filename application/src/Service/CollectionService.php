<?php

declare(strict_types=1);

namespace App\Service;

use App\Adapter\App\Database\Doctrine\Repository\CollectionRepository;
use App\Constant\FolderConstants;
use App\ValueObject\OpenGraph\WebsiteValueObject;
use Pimcore\Model\Asset;
use Pimcore\Model\Asset\Image;
use Pimcore\Model\DataObject;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\String\Slugger\SluggerInterface;

use function count;
use function sprintf;

readonly class CollectionService
{
    public function __construct(
        private CollectionRepository $collectionRepository,
        private BlogpostService $blogpostService,
        private SluggerInterface $slugger,
    ) {
    }

    public function setTitleAndSlugByKey(DataObject\Collection $collection): void
    {
        if (trim($collection->getTitle() ?? '') !== '') {
            return;
        }

        $collection->setTitle($collection->getKey());

        if (trim($collection->getSlug() ?? '') !== '') {
            return;
        }

        $slug   = [];
        $slug[] = $collection->getTitle();

        $collection->setSlug($this->slugger->slug(implode(' ', $slug))->lower()->toString());
    }

    /**
     * @return DataObject\Collection[]
     */
    public function getRecommendedCollections(DataObject\Collection $collection): array
    {
        $collections = $collection->getSiblings([DataObject\AbstractObject::OBJECT_TYPE_OBJECT])?->load();
        foreach ($collection->getAdditionalRecommendationEntrypoints() as $parent) {
            if (!$parent instanceof DataObject\Folder) {
                continue;
            }

            $collections = array_merge($collections, $parent->getChildren([DataObject\AbstractObject::OBJECT_TYPE_OBJECT])?->load());
        }

        return array_filter($collections, static fn ($collection) => $collection instanceof DataObject\Collection);
    }

    public function getOpenGraphData(Request $request, DataObject\Collection $collection): WebsiteValueObject
    {
        return new WebsiteValueObject(
            title: $collection->getTitle(),
            description: $collection->getOgDescription() ?? '',
            image: $request->getSchemeAndHttpHost().$collection->getSocialPreviewThumbnail()?->getFullPath() ?? '',
            url: $request->getUri(),
        );
    }

    public function generateSocialPreviewThumbnails(DataObject\Collection $collection): void
    {
        $existingSocialMediaImage = $collection->getSocialPreviewThumbnail();

        if ($existingSocialMediaImage instanceof Image) {
            return;
        }

        $imageTeaser = $collection->getImageTeaser();

        if (!$imageTeaser instanceof Image) {
            return;
        }

        $assetsFolder = Asset\Service::createFolderByPath(FolderConstants::ASSET_COLLECTIONS);
        if (!$assetsFolder instanceof Asset) {
            return;
        }

        $name = sprintf(
            'socialPreviewThumbnail_%s.jpg',
            $collection->getId()
        );

        $socialPreviewThumbnail = $imageTeaser->getThumbnail('socialPreviewImage', false);

        $stream    = $socialPreviewThumbnail->getStream();
        $imageData = stream_get_contents($stream);

        // Delete existing asset
        $asset = Asset::getByPath($assetsFolder->getFullPath().'/'.$name);
        if ($asset instanceof Image) {
            $asset->delete();
        }

        $asset = new Image();
        $asset->setData($imageData);
        $asset->setKey($name);
        $asset->setParent($assetsFolder);
        $asset->setFilename($name);
        $asset->save();

        $collection->setSocialPreviewThumbnail($asset);

        $this->collectionRepository->persist($collection);
    }

    public function setTeaserImageFromBlogposts(DataObject\Collection $collection): void
    {
        // Image Teaser
        $blogposts = $this->blogpostService->getBlogpostsByCollection($collection) ?? [];

        if (count($blogposts) > 0) {
            $imageTeaser = $blogposts[array_rand($blogposts)]->imageTeaser;
            if ($imageTeaser instanceof Image) {
                $collection->setImageTeaser($imageTeaser);
            }
        }

        $this->collectionRepository->persist($collection);
    }
}
