<?php

declare(strict_types=1);

namespace App\Service;

use App\Constant\FolderConstants;
use App\ValueObject\OpenGraph\ArticleValueObject;
use Carbon\Carbon;
use Pimcore\Model\Asset;
use Pimcore\Model\Asset\Image;
use Pimcore\Model\Document;
use Pimcore\Model\Element\DuplicateFullPathException;
use Symfony\Component\HttpFoundation\Request;

use function sprintf;

class DocumentService
{
    /**
     * @throws DuplicateFullPathException
     */
    public function getSocialPreviewThumbnail(Document $document): ?Image
    {
        $name = sprintf(
            'socialPreviewThumbnail_%s.jpg',
            $document->getId()
        );

        $existingSocialPreviewThumbnail = Image::getByPath(
            sprintf(
                '%s/%s',
                FolderConstants::ASSET_WEBSITE_DOCUMENTS,
                $name
            )
        );

        if ($existingSocialPreviewThumbnail instanceof Image) {
            return $existingSocialPreviewThumbnail;
        }

        $heroImageEditable = $document->getEditable('heroImage');

        if (!$heroImageEditable instanceof Document\Editable\Image) {
            return null;
        }

        $heroImage = $heroImageEditable->getImage();

        if (!$heroImage instanceof Image) {
            return null;
        }

        $assetsFolder = Asset\Service::createFolderByPath(FolderConstants::ASSET_WEBSITE_DOCUMENTS);
        if (!$assetsFolder instanceof Asset\Folder) {
            return null;
        }

        $socialPreviewThumbnail = $heroImage->getThumbnail('socialPreviewImage', false);

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

        return $asset;
    }

    /**
     * @throws DuplicateFullPathException
     */
    public function getOpenGraphData(Request $request, Document $document): ArticleValueObject
    {
        $socialPreviewThumbnail = $this->getSocialPreviewThumbnail($document);

        return new ArticleValueObject(
            title: $document->getTitle(),
            description: $document->getDescription(),
            image: $socialPreviewThumbnail instanceof Image ? $request->getSchemeAndHttpHost().$socialPreviewThumbnail->getFullPath() : '',
            url: $request->getUri(),
            authors: $document->getEditable('authors')?->getData() ?? [],
            tags: $document->getEditable('tags')?->getData() ?? [],
            publishedTime: Carbon::createFromTimestamp($document->getModificationDate()) ?? Carbon::now(),
        );
    }
}
