<?php

declare(strict_types=1);

namespace App\Service;

use App\Constant\FolderConstants;
use Exception;
use Pimcore\Model\Asset\Folder;
use Pimcore\Model\Asset\Service;
use Pimcore\Model\DataObject;
use Pimcore\Model\DataObject\AbstractObject;

use function sprintf;

class DataObjectService
{
    /**
     * @throws Exception
     */
    public function setAssetsFolderByObjectKey(DataObject $object): void
    {
        $key = Service::getValidKey($object->getKey(), AbstractObject::OBJECT_TYPE_FOLDER);

        $assetsFolder = $object->getAssetsFolder();

        if ($assetsFolder instanceof Folder) {
            $assetsFolder->setKey($key);
            $assetsFolder->save();

            return;
        }

        $pathPrefix = match ($object->getClassId()) {
            DataObject\Blogpost::classId() => FolderConstants::ASSET_BLOGPOSTS,
            default                        => '/',
        };

        $assetsFolder = Service::createFolderByPath(
            sprintf(
                '%s/%s',
                $pathPrefix,
                $key
            )
        );

        $object->setAssetsFolder($assetsFolder);
    }

    /**
     * @throws \Pimcore\Model\Element\DuplicateFullPathException
     */
    public function moveAssetsFolderToTrash(DataObject $object): void
    {
        if (method_exists($object, 'getAssetsFolder') === false) {
            return;
        }

        $assetsFolder = $object->getAssetsFolder();

        if (!$assetsFolder instanceof Folder) {
            return;
        }

        $parent = Folder::getByPath(FolderConstants::ASSET_BLOGPOSTS_DELETED);

        $assetsFolder->setParent($parent);
        $assetsFolder->save();
    }
}
