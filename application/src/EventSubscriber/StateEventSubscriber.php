<?php

declare(strict_types=1);

namespace App\EventSubscriber;

use App\Adapter\App\Database\Doctrine\Repository\CountryRepository;
use Pimcore\Event\DataObjectEvents;
use Pimcore\Event\Model\DataObjectEvent;
use Pimcore\Model\DataObject;
use Pimcore\Model\Element\ValidationException;

class StateEventSubscriber extends AbstractEventSubscriber
{
    public function __construct(
        private readonly CountryRepository $countryRepository,
    ) {
    }

    /** @codeCoverageIgnore  */
    public static function getSubscribedEvents(): array
    {
        return [
            DataObjectEvents::PRE_ADD => [
                ['ensureCountryAsParent'],
            ],
            DataObjectEvents::PRE_UPDATE => [
                ['ensureCountryAsParent'],
            ],
        ];
    }

    public function ensureCountryAsParent(DataObjectEvent $event): void
    {
        $object = $event->getObject();

        if (!$object instanceof DataObject\State) {
            return;
        }

        $country = $this->countryRepository->getCountryByState($object);

        if (!$country instanceof DataObject\Country) {
            throw new ValidationException('State requires a parent country');
        }
    }
}
