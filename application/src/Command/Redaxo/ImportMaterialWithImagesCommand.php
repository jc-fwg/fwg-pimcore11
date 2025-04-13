<?php

declare(strict_types=1);

namespace App\Command\Redaxo;

use App\Adapter\App\Database\Doctrine\Repository\ManufacturerRepository;
use App\Adapter\App\Database\Doctrine\Repository\RentalCategoryRepository;
use App\Adapter\App\Database\Doctrine\Repository\RentalObjectRepository;
use App\Adapter\Redaxo\Database\Doctrine\Repository\RedaxoRepository;
use App\Constant\FolderConstants;
use App\EventSubscriber\EventEventSubscriber;
use App\Service\RedaxoSlugService;
use Carbon\Carbon;
use App\Command\AbstractCommand;
use Pimcore\Model\DataObject\AbstractObject;
use Pimcore\Model\DataObject\Data\Hotspotimage;
use Pimcore\Model\DataObject\Data\ImageGallery;
use Pimcore\Model\DataObject\RentalObject;
use Pimcore\Model\DataObject\Service;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'app:import:redaxo-material-with-images',
    description: 'Imports material and related images from Redaxo database and creates Assets, RentalObject objects and relations.'
)]
class ImportMaterialWithImagesCommand extends AbstractCommand
{
    private const string DATA_KEY_ARTICLE_SLICE_ID = 'id';
    private const string DATA_KEY_RENTAL_CATEGORY_ID = 'value5';
    private const string DATA_KEY_IMAGE_TEASER = 'media1';
    private const string DATA_KEY_IMAGES_GALLERY = 'medialist1';
    private const string DATA_KEY_MANUFACTURER_ID = 'value1';
    private const string DATA_KEY_TEXT = 'value3';
    private const string DATA_KEY_TITLE = 'value2';
    private const string DATA_KEY_DATE_CREATE = 'createdate';
    private const string DATA_KEY_DATE_UPDATE = 'updatedate';

    public function __construct(
        private readonly ManufacturerRepository   $manufacturerRepository,
        private readonly RedaxoRepository         $redaxoRepository,
        private readonly RedaxoSlugService        $redaxoSlugService,
        private readonly RentalObjectRepository   $rentalObjectRepository,
        private readonly RentalCategoryRepository $rentalCategoryRepository,
        ?string                                   $name = null,
    )
    {
        parent::__construct($name);
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $this->io->title('Importing material with images from Redaxo database...');

        $redaxoItems = $this->redaxoRepository->getMaterials();

        $parentMaterialObjects = Service::createFolderByPath(FolderConstants::OBJECT_MATERIAL_MATERIAL);

        foreach ($redaxoItems as $item) {
            $itemData = [
                'articleSliceId' => (string) $item[self::DATA_KEY_ARTICLE_SLICE_ID],
                'rentalCategoryId' => (string) $item[self::DATA_KEY_RENTAL_CATEGORY_ID],
                'imageTeaser' => $item[self::DATA_KEY_IMAGE_TEASER],
                'imagesGallery' => $item[self::DATA_KEY_IMAGES_GALLERY],
                'manufacturerId' => trim($item[self::DATA_KEY_MANUFACTURER_ID]),
                'text' => trim($item[self::DATA_KEY_TEXT]),
                'title' => (empty(trim($item[self::DATA_KEY_TITLE])) === false) ? trim($item[self::DATA_KEY_TITLE]) : '-- KEIN TITEL --',
                'dateCreate' => substr($item[self::DATA_KEY_DATE_CREATE], 0, 10),
                'dateUpdate' => substr($item[self::DATA_KEY_DATE_UPDATE], 0, 10),
            ];

            $this->writeInfo(sprintf('Processing material: %s (ArticleSliceID: %s)', $itemData['title'], $itemData['articleSliceId']));

            $preventEventUpdateKey = true;

            // Get or create RentalObject and set data
            $rentalObject = $this->rentalObjectRepository->findOneByArticleSliceId($itemData['articleSliceId'], false);

            if (!$rentalObject instanceof RentalObject) {
                $this->writeInfo(sprintf("...Creating RentalObject '%s'", $itemData['title']));

                $rentalObject = new RentalObject();
                $rentalObject->setParent($parentMaterialObjects);
                $rentalObject->setPublished(true);
                $rentalObject->setRedaxoArticleSliceId((int) $itemData['articleSliceId']);

                $preventEventUpdateKey = false;
            }

            $rentalObject->setRedaxoDateCreate(Carbon::createFromFormat('Y-m-d', $itemData['dateCreate']));
            $rentalObject->setRedaxoDateUpdate(Carbon::createFromFormat('Y-m-d', $itemData['dateUpdate']));

            $manufacturer = null;
            if ($itemData['manufacturerId'] !== '') {
                $manufacturer = $this->manufacturerRepository->findOneByRedaxoId($itemData['manufacturerId'], false);
                $rentalObject->setManufacturer((string) $manufacturer->getId());
            }

            $rentalCategory = null;
            if ($itemData['rentalCategoryId'] !== '') {
                $rentalCategory = $this->rentalCategoryRepository->findOneByRedaxoId($itemData['rentalCategoryId']);
                $rentalObject->setRentalCategory((string) $rentalCategory->getId());
            }

            $rentalObjectTitle = sprintf(
                '%s %s',
                $manufacturer?->getName() ?? '',
                $itemData['title'],
            );

            $rentalObject->setKey(Service::getValidKey($rentalObjectTitle, AbstractObject::OBJECT_TYPE_OBJECT));
            $rentalObject->setTitle($itemData['title']);

            $rentalObject->setText($itemData['text']);

            // Redaxo slug
            $this->redaxoSlugService->addSlugPart($manufacturer->getName(), null);
            $this->redaxoSlugService->addSlugPart($itemData['title']);
            $this->redaxoSlugService->addSlugPart(sprintf(
                'eqid%s',
                $itemData['articleSliceId']
            ));

            try {
                $redaxoSlug = $this->redaxoSlugService->buildSlug();

                $rentalObject->setRedaxoSlug($redaxoSlug);

                $this->writeInfo(sprintf('...Redaxo URL check successful: %s', $redaxoSlug));
            } catch (\RuntimeException $e) {
                $this->writeError('...failed to build Redaxo URL: ' . $e->getMessage());
            }

            $this->io->writeln('...importing images...');


            $assetParent = \Pimcore\Model\Asset\Service::createFolderByPath(sprintf('%s/%s',FolderConstants::ASSET_MATERIAL, $rentalObject->getKey()));

            // Teaser image
            $teaserImage = $this->getOrCreateAsset($itemData['imageTeaser'], $itemData['articleSliceId'], $assetParent);
            $rentalObject->setImageTeaser($teaserImage);

            $this->writeInfo(sprintf("...teaser image imported (%s).", $itemData['imageTeaser']));

            // Gallery images
            $galleryImages = explode(',', $itemData['imagesGallery']);

            if (is_array($galleryImages) === true) {
                $imageGallery = new ImageGallery();
                $imageGalleryItems = [];

                foreach ($galleryImages as $galleryImage) {
                    $galleryImage = $this->getOrCreateAsset($galleryImage, $itemData['articleSliceId'], $assetParent);
                    $hotspotImage = new Hotspotimage();
                    $hotspotImage->setImage($galleryImage);
                    $imageGalleryItems[] = $hotspotImage;

                    $this->writeInfo(sprintf("...gallery image imported (%s).", $galleryImage));
                }

                $imageGallery->setItems($imageGalleryItems);
                $rentalObject->setImageGallery($imageGallery);
            }

            $this->rentalObjectRepository->persist($rentalObject, [EventEventSubscriber::ARGUMENT_PREVENT_EVENT_UPDATE_KEY => $preventEventUpdateKey]);

            $this->io->writeln('Material and images imported.');
        }

        return self::SUCCESS;
    }
}
