<?php

declare(strict_types=1);

namespace App\Service;

use App\Adapter\App\Database\Doctrine\Repository\RentalObjectRepository;
use App\Dto\RentalObjectDetailsDto;
use Pimcore\Bundle\UuidBundle\Model\Tool\UUID;
use Pimcore\Model\DataObject\Data\Hotspotimage;
use Pimcore\Model\DataObject\Data\ImageGallery;
use Pimcore\Model\DataObject\Event;
use Pimcore\Model\DataObject\Manufacturer;
use Pimcore\Model\DataObject\RentalCategory;
use Pimcore\Model\DataObject\RentalObject;
use Symfony\Component\String\Slugger\SluggerInterface;

class RentalService
{
    public function __construct(
        private readonly RentalObjectRepository $rentalObjectRepository,
        private readonly SluggerInterface $slugger,
    )
    {
    }

    /**
     * @return RentalObjectDetailsDto[]
     */
    public function getRentalObjects(?int $limit = null): array
    {
        $rentalObjects = $this->rentalObjectRepository->findAll();

        $data = [];

        /** @var Event $event */
        foreach ($rentalObjects as $rentalObject) {
            $data[] = $this->getRentalObjectDetails($rentalObject);
        }

        return match (true) {
            $limit > 0 => array_slice($data, 0, $limit),
            $limit === null => $data,
        };
    }

    public function generateAndSetSlug(RentalObject $rentalObject): void
    {
        $slug = [];

        $manufacturer = Manufacturer::getById($rentalObject->getManufacturer());

        if ($manufacturer instanceof Manufacturer) {
            $slug[] = $manufacturer->getName();
        }

        $slug[] = $rentalObject->getTitle();

        $slug = $this->slugger->slug(implode(' ', $slug))->toString();

        // Prevent slug duplication
        $rentalObjectSlugged = $this->rentalObjectRepository->findOneBySlug($slug, false);
        if (
            $rentalObjectSlugged instanceof RentalObject
            && $rentalObjectSlugged->getId() !== $rentalObject->getId()
        ) {
            $slug = sprintf('%s-%s', $slug, $rentalObject->getId());
        }

        $rentalObject->setSlug($slug);
    }

    public function getRentalObjectDetails(RentalObject $rentalObject): RentalObjectDetailsDto
    {
        // Image: List
        $imageGalleryFirst = $rentalObject->getImageGallery()?->current();
        $imageList = ($imageGalleryFirst instanceof Hotspotimage) ?
            $imageGalleryFirst->getImage() : null;

        // Image: Gallery
        $imageGallery = [];
        $imagesGallery = $rentalObject->getImageGallery();
        if ($imagesGallery instanceof ImageGallery) {
            foreach ($imagesGallery as $item) {
                if ($item instanceof Hotspotimage) {
                    $imageGallery[] = $item->getImage();
                }
            }
        }

        return new RentalObjectDetailsDto(
            rentalObject: $rentalObject,
            manufacturer: Manufacturer::getById($rentalObject->getManufacturer()),
            rentalCategory: RentalCategory::getById($rentalObject->getRentalCategory()),
            imageList: $imageList,
            imageTeaser: $rentalObject->getImageTeaser(),
            imageGallery: $imageGallery,
            uuid: UUID::getByItem($rentalObject)->getUuid(),
        );
    }
}
