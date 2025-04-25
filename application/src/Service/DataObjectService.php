<?php

declare(strict_types=1);

namespace App\Service;

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
}
