<?php

declare(strict_types=1);

namespace App\Service;

use App\Constant\FolderConstants;
use Pimcore\Model\Asset\Folder;
use Pimcore\Model\Asset\Service;
use Pimcore\Model\DataObject\AbstractObject;
use Pimcore\Model\DataObject\Concrete;

class DataObjectService
{
    /**
     * @throws \Exception
     */
    public function setAssetsFolderByObjectKey(Concrete $object, string $pathPrefix = '/'): void
    {
        if (method_exists($object, 'getAssetsFolder') === false) {
            return;
        }

        if (empty($object->getKey())) {
            return;
        }

        $key = Service::getValidKey($object->getKey(), AbstractObject::OBJECT_TYPE_FOLDER);

        $assetsFolder = $object->getAssetsFolder();

        if ($assetsFolder instanceof Folder) {
            $assetsFolder->setKey($key);
            $assetsFolder->save();
            $object->setAssetsFolder($assetsFolder);

            return;
        }

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
    public function moveAssetsFolderToTrash(Concrete $object): void
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
