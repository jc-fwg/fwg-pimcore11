<?php

declare(strict_types=1);

namespace App\Command\Redaxo;

use App\Adapter\App\Database\Doctrine\Repository\EventRepository;
use App\Adapter\App\Database\Doctrine\Repository\LocationRepository;
use App\Adapter\Redaxo\Database\Doctrine\Repository\RedaxoRepository;
use App\Constant\FolderConstants;
use App\Service\RedaxoSlugService;
use Carbon\Carbon;
use Pimcore\Console\AbstractCommand;
use Pimcore\Model\DataObject\AbstractObject;
use Pimcore\Model\DataObject\Event;
use Pimcore\Model\DataObject\Location;
use Pimcore\Model\DataObject\Service;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'app:import:redaxo-old-references',
    description: 'Imports old references from Redaxo database and creates Event objects.'
)]
class ImportOldReferencesCommand extends AbstractCommand
{
    public function __construct(
        private readonly EventRepository $eventRepository,
        private readonly LocationRepository $locationRepository,
        private readonly RedaxoRepository $redaxoRepository,
        private readonly RedaxoSlugService $redaxoSlugService,
        ?string $name = null,
    )
    {
        parent::__construct($name);
    }


    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $this->io->title('Importing old references from Redaxo database...');

        $redaxoItems = $this->redaxoRepository->getOldReferences();

        $parentEvents = Service::createFolderByPath(FolderConstants::OBJECT_EVENTS_EVENTS);
        $parentLocations = Service::createFolderByPath(FolderConstants::OBJECT_EVENTS_LOCATIONS);

        foreach ($redaxoItems as $item) {

            $redaxoId = (int) $item[RedaxoRepository::COLUMN_OLD_REFERENCES_ID];

            $this->writeInfo(sprintf('Processing reference: %s (RedaxoID: %s)', $item[RedaxoRepository::COLUMN_OLD_REFERENCES_HEADLINE], $redaxoId));

            $location = null;
            $locationName = '';
            $eventTitle = $item[RedaxoRepository::COLUMN_OLD_REFERENCES_HEADLINE];
            $eventKey = $eventTitle;
            $headlineSeperated = explode(',', $eventTitle);

            // Get or generate Location
            if (
                is_array($headlineSeperated) === true
                && count($headlineSeperated) > 1
            ) {
                $locationName = trim(array_pop($headlineSeperated));
                $eventTitle = implode(',', $headlineSeperated);
                $eventKey = $eventTitle;
            }

            if ($locationName !== '') {
                $this->io->writeln(sprintf("...relate location '%s'...", $locationName));

                $location = $this->locationRepository->findOneByName($locationName, false);

                if (!$location instanceof Location) {
                    $location = new Location();
                    $location->setParent($parentLocations);
                    $location->setKey(Service::getValidKey($locationName, AbstractObject::OBJECT_TYPE_OBJECT));
                    $location->setPublished(true);
                    $this->locationRepository->persist($location);

                    $this->io->writeln(sprintf("...did not exits. Created location '%s'.", $locationName));
                }

                $eventKey = sprintf('%s, %s', $eventTitle, $locationName);
            }

            $this->redaxoSlugService->addSlugPart($eventTitle, null);
            $this->redaxoSlugService->addSlugPart($locationName);
            $this->redaxoSlugService->addSlugPart(sprintf(
                'rid%s',
                $redaxoId
            ));

            // Event dates : Start
            $dateStart = null;
            if ($item[RedaxoRepository::COLUMN_OLD_REFERENCES_DATE_START] !== '0000-00-00') {
                $dateStart = Carbon::createFromFormat('Y-m-d', $item[RedaxoRepository::COLUMN_OLD_REFERENCES_DATE_START]);
            }

            // Event dates : End
            $dateEnd = null;
            if ($item[RedaxoRepository::COLUMN_OLD_REFERENCES_DATE_END] !== '0000-00-00') {
                $dateEnd = Carbon::createFromFormat('Y-m-d', $item[RedaxoRepository::COLUMN_OLD_REFERENCES_DATE_END]);
            }

            // Get or generate Event
            $object = $this->eventRepository->findOneByRedaxoId($redaxoId, false);

            if (!$object instanceof Event) {
                $object = new Event();
                $object->setParent($parentEvents);

                $object->setKey(
                    Service::getValidKey($eventKey, AbstractObject::OBJECT_TYPE_OBJECT)
                );

                $uniqueKey = Service::getUniqueKey($object);
                $object->setKey($uniqueKey);

                $object->setPublished(true);
            }

            if ($location instanceof Location) {
                $object->setLocation((string) $location->getId());
            }

            $object->setTitle($eventTitle);
            $object->setText($item[RedaxoRepository::COLUMN_OLD_REFERENCES_TEXT]);
            $object->setRedaxoId($redaxoId);

            if ($dateStart instanceof Carbon) {
                $object->setDateStart($dateStart);
            }

            if ($dateEnd instanceof Carbon) {
                $object->setDateEnd($dateEnd);
            }

            try {
                $redaxoSlug = $this->redaxoSlugService->buildSlug();

                $object->setRedaxoSlug($redaxoSlug);

                $this->writeInfo(sprintf('...Redaxo URL check successful: %s', $redaxoSlug));
            } catch (\RuntimeException $e) {
                $this->writeError('...failed to build Redaxo URL: ' . $e->getMessage());
            }

            $this->eventRepository->persist($object);

            $this->io->writeln('Reference imported.');
        }

        return self::SUCCESS;
    }
}
