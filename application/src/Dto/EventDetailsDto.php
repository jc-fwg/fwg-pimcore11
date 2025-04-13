<?php

namespace App\Dto;

use Pimcore\Model\Asset\Image;
use Pimcore\Model\DataObject\Customer;
use Pimcore\Model\DataObject\Data\Hotspotimage;
use Pimcore\Model\DataObject\Event;
use Pimcore\Model\DataObject\EventCategory;
use Pimcore\Model\DataObject\Location;

readonly class EventDetailsDto
{
    /**
     * @param string[] $title
     * @param Hotspotimage[] $imageGallery
     */
    public function __construct(
        public Event $event,
        public ?EventCategory $eventCategory,
        public ?Customer $customer,
        public ?Location $location,
        public array $title,
        public ?Image $imageList,
        public ?Image $imageTeaser,
        public array $imageGallery,
        public string $uuid
    )
    {
    }
}
