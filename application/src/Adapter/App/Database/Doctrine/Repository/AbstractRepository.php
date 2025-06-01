<?php

declare(strict_types=1);

namespace App\Adapter\App\Database\Doctrine\Repository;

use Exception;
use Pimcore\Model\DataObject\AbstractObject;
use Pimcore\Model\DataObject\Listing;
use Pimcore\Model\Element\AbstractElement;

use function sprintf;

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

    /**
     * @throws Exception
     */
    public function findById(string $id): ?AbstractObject
    {
        $object = AbstractObject::getById($id);

        if (!$object instanceof AbstractObject) {
            return null;
        }

        if ($object::class !== $this->getExpectedClass()) {
            throw new Exception(sprintf('Object with ID %s is not of type %s, but of type %s', $id, static::class, $object::class));
        }

        return $object;
    }

    abstract protected function getExpectedClass(): string;
}
