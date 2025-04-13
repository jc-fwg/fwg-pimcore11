<?php

declare(strict_types=1);

namespace App\Command\Redaxo;

use App\Adapter\App\Database\Doctrine\Repository\CustomerRepository;
use App\Adapter\App\Database\Doctrine\Repository\EventCategoryRepository;
use App\Adapter\App\Database\Doctrine\Repository\EventRepository;
use App\Adapter\App\Database\Doctrine\Repository\LocationRepository;
use App\Adapter\Redaxo\Database\Doctrine\Repository\RedaxoRepository;
use App\Constant\FolderConstants;
use App\EventSubscriber\EventEventSubscriber;
use App\Service\RedaxoSlugService;
use Carbon\Carbon;
use App\Command\AbstractCommand;
use Pimcore\Model\DataObject\AbstractObject;
use Pimcore\Model\DataObject\Customer;
use Pimcore\Model\DataObject\Data\Hotspotimage;
use Pimcore\Model\DataObject\Data\ImageGallery;
use Pimcore\Model\DataObject\Event;
use Pimcore\Model\DataObject\Location;
use Pimcore\Model\DataObject\Service;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'app:import:redaxo-references-with-images',
    description: 'Imports references and related images from Redaxo database and creates Assets, Event objects and relations.'
)]
class ImportReferencesWithImagesCommand extends AbstractCommand
{
    private const string DATA_KEY_ARTICLE_SLICE_ID = 'id';
    private const string DATA_KEY_CUSTOMER = 'value1';
    private const string DATA_KEY_EVENT_CATEGORY_ID = 'value5';
    private const string DATA_KEY_IMAGE_TEASER = 'media1';
    private const string DATA_KEY_IMAGES_GALLERY = 'medialist1';
    private const string DATA_KEY_LOCATION = 'value4';
    private const string DATA_KEY_TEXT = 'value2';
    private const string DATA_KEY_TITLE = 'value3';
    private const string DATA_KEY_DATE_CREATE = 'createdate';
    private const string DATA_KEY_DATE_UPDATE = 'updatedate';

    private const string REDAXO_MEDIA_URL_PREFIX = 'https://artworldmedia.de/media/';

    public function __construct(
        private readonly CustomerRepository      $customerRepository,
        private readonly EventRepository         $eventRepository,
        private readonly EventCategoryRepository $eventCategoryRepository,
        private readonly LocationRepository      $locationRepository,
        private readonly RedaxoRepository        $redaxoRepository,
        private readonly RedaxoSlugService       $redaxoSlugService,
        ?string                                  $name = null,
    )
    {
        parent::__construct($name);
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $this->io->title('Importing references with images from Redaxo database...');

        $redaxoItems = $this->redaxoRepository->getReferences();

        $parentEvents = Service::createFolderByPath(FolderConstants::OBJECT_EVENTS_EVENTS);

        foreach ($redaxoItems as $item) {

            $itemData = [
                'articleSliceId' => (int) $item[self::DATA_KEY_ARTICLE_SLICE_ID],
                'customer' => trim($item[self::DATA_KEY_CUSTOMER]),
                'eventCategoryId' => (string) $item[self::DATA_KEY_EVENT_CATEGORY_ID],
                'imageTeaser' => $item[self::DATA_KEY_IMAGE_TEASER],
                'imagesGallery' => $item[self::DATA_KEY_IMAGES_GALLERY],
                'location' => trim($item[self::DATA_KEY_LOCATION]),
                'text' => trim($item[self::DATA_KEY_TEXT]),
                'title' => (empty(trim($item[self::DATA_KEY_TITLE])) === false) ? trim($item[self::DATA_KEY_TITLE]) : '-- KEIN TITEL --',
                'dateCreate' => substr($item[self::DATA_KEY_DATE_CREATE], 0, 10),
                'dateUpdate' => substr($item[self::DATA_KEY_DATE_UPDATE], 0, 10),
            ];

            $this->writeInfo(sprintf('Processing reference: %s (ArticleSliceID: %s)', $itemData['title'], $itemData['articleSliceId']));

            $eventCategory = $this->eventCategoryRepository->findOneByRedaxoId($itemData['eventCategoryId']);

            $this->redaxoSlugService->addSlugPart($eventCategory->getName(), null);

            $preventEventUpdateKey = true;

            // Get or create Event and set data
            $event = $this->eventRepository->findOneByArticleSliceId($itemData['articleSliceId'], false);

            if (!$event instanceof Event) {
                $this->writeInfo(sprintf("...Creating Event '%s'", $itemData['title']));

                $event = new Event();
                $event->setParent($parentEvents);
                $event->setPublished(true);
                $event->setRedaxoArticleSliceId($itemData['articleSliceId']);

                $preventEventUpdateKey = false;
            }

            $event->setEventCategory((string) $eventCategory->getId());
            $event->setRedaxoDateCreate(Carbon::createFromFormat('Y-m-d', $itemData['dateCreate']));
            $event->setRedaxoDateUpdate(Carbon::createFromFormat('Y-m-d', $itemData['dateUpdate']));

            $customer = null;
            if ($itemData['customer'] !== '') {
                $customer = $this->getOrCreateCustomer($itemData['customer']);
                $event->setCustomer((string) $customer->getId());
                $this->redaxoSlugService->addSlugPart($customer->getName(), '/');
            }

            $this->redaxoSlugService->addSlugPart($itemData['title']);

            $location = null;
            if ($itemData['location'] !== '') {
                $location = $this->getOrCreateLocation($itemData['location']);
                $event->setLocation((string) $location->getId());
                $this->redaxoSlugService->addSlugPart($location->getName());
            }

            $this->redaxoSlugService->addSlugPart(sprintf(
                'eid%s',
                $itemData['articleSliceId']
            ));

            $this->writeInfo('...Creating Redaxo URL...');

            try {
                $redaxoSlug = $this->redaxoSlugService->buildSlug();

                $event->setRedaxoSlug($redaxoSlug);

                $this->writeInfo(sprintf('...Redaxo URL check successful: %s', $redaxoSlug));
            } catch (\RuntimeException $e) {
                $this->writeError('...failed to build Redaxo URL: ' . $e->getMessage());
            }

            $eventTitle = sprintf(
                '%s %s, %s',
                $customer?->getName() ?? '',
                $itemData['title'],
                $location?->getName() ?? ''
            );

            $event->setKey(Service::getValidKey($eventTitle, AbstractObject::OBJECT_TYPE_OBJECT));
            $event->setTitle($itemData['title']);

            $event->setText($itemData['text']);

            $this->io->writeln('...importing images...');

            $assetParent = \Pimcore\Model\Asset\Service::createFolderByPath(sprintf('%s/%s',FolderConstants::ASSET_EVENTS, $event->getKey()));

            // Teaser image
            $teaserImage = $this->getOrCreateAsset($itemData['imageTeaser'], (string) $itemData['articleSliceId'], $assetParent);
            $event->setImageTeaser($teaserImage);

            $this->writeInfo(sprintf("...teaser image imported (%s).", $itemData['imageTeaser']));

            // Gallery images
            $galleryImages = explode(',', $itemData['imagesGallery']);

            if (is_array($galleryImages) === true) {
                $imageGallery = new ImageGallery();
                $imageGalleryItems = [];

                foreach ($galleryImages as $galleryImage) {
                    $galleryImage = $this->getOrCreateAsset($galleryImage, (string) $itemData['articleSliceId'], $assetParent);
                    $hotspotImage = new Hotspotimage();
                    $hotspotImage->setImage($galleryImage);
                    $imageGalleryItems[] = $hotspotImage;

                    $this->writeInfo(sprintf("...gallery image imported (%s).", $galleryImage));
                }

                $imageGallery->setItems($imageGalleryItems);
                $event->setImageGallery($imageGallery);
            }

            $this->eventRepository->persist($event, [EventEventSubscriber::ARGUMENT_PREVENT_EVENT_UPDATE_KEY => $preventEventUpdateKey]);

            $this->io->writeln('Reference and images imported.');
        }

        return self::SUCCESS;
    }

    private function getOrCreateCustomer(string $customerName): Customer
    {
        $parent = Service::createFolderByPath(FolderConstants::OBJECT_EVENTS_CUSTOMER);

        $customer = $this->customerRepository->findOneByName($customerName, false);

        if (!$customer instanceof Customer) {
            $this->writeInfo(sprintf("...Creating Customer '%s'.", $customerName));

            $customer = new Customer();
            $customer->setKey($customerName);
            $customer->setParent($parent);
            $customer->setPublished(true);

            $this->customerRepository->persist($customer);
        }

        return $customer;
    }

    private function getOrCreateLocation(string $locationName): Location
    {
        $parent = Service::createFolderByPath(FolderConstants::OBJECT_EVENTS_LOCATIONS);

        $location = $this->locationRepository->findOneByName($locationName, false);

        if (!$location instanceof Location) {
            $this->writeInfo(sprintf("...Creating Location '%s'.", $locationName));

            $location = new Location();
            $location->setKey($locationName);
            $location->setParent($parent);
            $location->setPublished(true);

            $this->locationRepository->persist($location);
        }

        return $location;
    }
}
