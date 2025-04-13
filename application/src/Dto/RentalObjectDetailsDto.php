<?php

namespace App\Dto;

use Pimcore\Model\Asset\Image;
use Pimcore\Model\DataObject\Customer;
use Pimcore\Model\DataObject\Data\Hotspotimage;
use Pimcore\Model\DataObject\Event;
use Pimcore\Model\DataObject\EventCategory;
use Pimcore\Model\DataObject\Location;
use Pimcore\Model\DataObject\Manufacturer;
use Pimcore\Model\DataObject\RentalCategory;
use Pimcore\Model\DataObject\RentalObject;

readonly class RentalObjectDetailsDto
{
    /**
     * @param Hotspotimage[] $imageGallery
     */
    public function __construct(
        public RentalObject $rentalObject,
        public ?Manufacturer $manufacturer,
        public ?RentalCategory $rentalCategory,
        public ?Image $imageList,
        public ?Image $imageTeaser,
        public array $imageGallery,
        public string $uuid
    )
    {
    }
}
