<?php

declare(strict_types=1);

namespace App\Command\Redaxo;

use App\Adapter\App\Database\Doctrine\Repository\AssetRepository;
use App\Adapter\App\Database\Doctrine\Repository\EventRepository;
use App\Adapter\Redaxo\Database\Doctrine\Repository\RedaxoRepository;
use App\Constant\FolderConstants;
use App\EventSubscriber\EventEventSubscriber;
use Pimcore\Console\AbstractCommand;
use Pimcore\Model\Asset;
use Pimcore\Model\Asset\Image;
use Pimcore\Model\DataObject\Data\Hotspotimage;
use Pimcore\Model\DataObject\Data\ImageGallery;
use Pimcore\Model\DataObject\Event;
use Pimcore\Model\Version;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'app:import:redaxo-old-references-images',
    description: 'Imports old references images as files from Redaxo database, creates Pimcore assets and relates to matching Event objects.'
)]
class ImportOldReferencesImagesCommand extends AbstractCommand
{
    public function __construct(
        private readonly RedaxoRepository $redaxoRepository,
        private readonly EventRepository $eventRepository,
        private readonly AssetRepository $assetRepository,
        ?string $name = null,
    )
    {
        parent::__construct($name);
    }


    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $this->io->title('Importing images from Redaxo database and file system...');

        $images = $this->redaxoRepository->getOldReferencesImages();

        foreach ($images as $image) {

            $this->writeInfo(
                sprintf(
                    'Processing image: %s (RedaxoID: %s / Event Redaxo ID: %s)',
                    $image[RedaxoRepository::COLUMN_OLD_REFERENCES_IMAGES_NAME],
                    $image[RedaxoRepository::COLUMN_OLD_REFERENCES_IMAGES_ID],
                    $image[RedaxoRepository::COLUMN_OLD_REFERENCES_IMAGES_EVENT_ID]
            ));

            $assetsByRedaxoId = $this->assetRepository->findOneByRedaxoId((string) $image[RedaxoRepository::COLUMN_OLD_REFERENCES_IMAGES_ID]);

            if (is_array($assetsByRedaxoId) === true) {
                $this->io->writeln('...image already imported. Skipping.');
                continue;
            }

            $imageUrl = sprintf('%s%s', RedaxoRepository::OLD_REFERENCES_IMAGES_URL_PREFIX, $image[RedaxoRepository::COLUMN_OLD_REFERENCES_IMAGES_NAME]);

            try {
                $this->io->writeln(sprintf('...downloading image (%s)...', $imageUrl));
                $imageData = file_get_contents($imageUrl);
            } catch (\Exception $e) {
                $this->io->error('...image not downloadable. Skipping...');
                continue;
            }

            $this->io->writeln('...retrieving Event from Pimcore...');

            $event = $this->eventRepository->findOneByRedaxoId($image[RedaxoRepository::COLUMN_OLD_REFERENCES_IMAGES_EVENT_ID], false);

            $parent = match(true) {
                $event instanceof Event => Asset\Service::createFolderByPath(sprintf('%s/%s',FolderConstants::ASSET_EVENTS, $event->getKey())),
                default => Asset\Service::createFolderByPath(FolderConstants::ASSET_EVENTS_NOT_RELATED)
            };

            $this->io->writeln(sprintf('...setting folder to: (%s)...', $parent->getFullPath()));

            $imageAsset = new Image();
            $imageAsset->setParent($parent);
            $imageAsset->setKey($image[RedaxoRepository::COLUMN_OLD_REFERENCES_IMAGES_NAME]);
            $imageAsset->setData($imageData);

            $imageAsset->addMetadata(
                AssetRepository::ASSETS_METADATA_NAME_REDAXO_ID,
                'input',
                (string) $image[RedaxoRepository::COLUMN_OLD_REFERENCES_IMAGES_ID]
            );

            $imageAsset->save();

            // Relate image to Event
            if ($event instanceof Event) {
                $this->io->writeln('...relating image to Event...');
                $eventImageGallery = $event->getImageGallery() ?? new ImageGallery();

                $hotspotImage = new Hotspotimage();
                $hotspotImage->setImage($imageAsset);

                $eventImageGallery->setItems(array_merge($eventImageGallery->getItems(), [$hotspotImage]));

                $event->setImageGallery($eventImageGallery);

                Version::disable();
                $this->eventRepository->persist($event, [EventEventSubscriber::ARGUMENT_PREVENT_EVENT_UPDATE_KEY => true]);
                Version::enable();
            }

            $this->io->writeln('Image imported.');
        }

        return self::SUCCESS;
    }
}
