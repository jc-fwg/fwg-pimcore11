<?php

declare(strict_types=1);

namespace App\Adapter\App\Database\Doctrine\Repository;

use Exception;
use Pimcore\Model\DataObject\AbstractObject;
use Pimcore\Model\DataObject\ClassDefinition;
use Pimcore\Model\DataObject\Listing;
use Pimcore\Model\Element\AbstractElement;

abstract class AbstractRepository
{
    /**
     * @param array<string, bool> $arguments
     *
     * @throws Exception
     *
     * @codeCoverageIgnore
     */
    public function persist(AbstractElement $object, array $arguments = []): void
    {
        $object->save($arguments);
    }

    /**
     * @codeCoverageIgnore
     *
     * @return AbstractObject[]
     */
    public static function useHideUnpublishedWithListing(bool $wantedStatus, Listing $listing): array
    {
        $currentStatus = AbstractObject::getHideUnpublished();
        AbstractObject::setHideUnpublished($wantedStatus);

        $result = $listing->load();

        AbstractObject::setHideUnpublished($currentStatus);

        return $result;
    }

    public function findById(string $id): ?AbstractObject
    {
        return AbstractObject::getById($id);
    }
}
