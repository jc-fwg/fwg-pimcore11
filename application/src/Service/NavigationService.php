<?php

declare(strict_types=1);

namespace App\Service;

use App\Constant\FolderConstants;
use Exception;
use Pimcore\Model\DataObject\Collection;
use Pimcore\Model\DataObject\Folder;
use Pimcore\Model\DataObject\Service;

class NavigationService
{
    /**
     * @return array<string, Collection[]>
     *
     * @throws Exception
     */
    public function getMainNavigation(): array
    {
        $mainNavigation = [];

        $navigationRoot = Service::createFolderByPath(FolderConstants::OBJECT_COLLECTIONS);

        $topics = $navigationRoot->getChildren();

        foreach ($topics as $node) {
            if (!$node instanceof Folder) {
                continue;
            }

            $collections = $node->getChildren()?->getObjects();

            $mainNavigation[] = [
                'folder'      => $node,
                'collections' => array_filter($collections, static fn ($collection) => $collection instanceof Collection),
            ];
        }

        return $mainNavigation;
    }
}
