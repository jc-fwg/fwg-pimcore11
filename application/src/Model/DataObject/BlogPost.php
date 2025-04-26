<?php

declare(strict_types=1);

namespace App\Model\DataObject;

use App\Constant\FolderConstants;
use App\Service\DataObjectService;

class BlogPost extends \Pimcore\Model\DataObject\BlogPost
{
    /**
     * @throws \Exception
     */
//    public function setKey(string $key): static
//    {
//        parent::setKey($key);
//
//        $dataObjectService = new DataObjectService();
//        $dataObjectService->setAssetsFolderByObjectKey($this, FolderConstants::ASSET_BLOGPOSTS);
//
//        return $this;
//    }
}

