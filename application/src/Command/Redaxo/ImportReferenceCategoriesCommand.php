<?php

declare(strict_types=1);

namespace App\Command\Redaxo;

use App\Adapter\App\Database\Doctrine\Repository\EventCategoryRepository;
use App\Adapter\Redaxo\Database\Doctrine\Repository\RedaxoRepository;
use App\Constant\FolderConstants;
use Pimcore\Console\AbstractCommand;
use Pimcore\Model\DataObject\AbstractObject;
use Pimcore\Model\DataObject\EventCategory;
use Pimcore\Model\DataObject\Service;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\String\Slugger\SluggerInterface;
use function Symfony\Component\String\u;

#[AsCommand(
    name: 'app:import:redaxo-reference-categories',
    description: 'Imports reference categories from Redaxo database and creates EventCategory objects.'
)]
class ImportReferenceCategoriesCommand extends AbstractCommand
{
    public function __construct(
        private readonly RedaxoRepository $redaxoRepository,
        private readonly EventCategoryRepository $eventCategoryRepository,
        private readonly SluggerInterface $slugger,
        ?string $name = null,
    )
    {
        parent::__construct($name);
    }


    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $this->io->title('Importing reference categories from Redaxo database...');

        $redaxoItems = $this->redaxoRepository->getReferenceCategories();

        $parent = Service::createFolderByPath(FolderConstants::OBJECT_EVENTS_CATEGORIES);

        foreach ($redaxoItems as $item) {

            $this->writeInfo(sprintf('Processing reference category: %s (RedaxoID: %s)', $item[RedaxoRepository::COLUMN_REFERENCE_CATEGORIES_NAME], $item[RedaxoRepository::COLUMN_REFERENCE_CATEGORIES_ID]));

            $object = $this->eventCategoryRepository->findOneByRedaxoId((string) $item[RedaxoRepository::COLUMN_REFERENCE_CATEGORIES_ID], false);

            if (!$object instanceof EventCategory) {
                $object = new EventCategory();

                $object->setKey(
                    Service::getValidKey($item[RedaxoRepository::COLUMN_REFERENCE_CATEGORIES_NAME], AbstractObject::OBJECT_TYPE_OBJECT)
                );

                $object->setRedaxoId((int) $item[RedaxoRepository::COLUMN_REFERENCE_CATEGORIES_ID]);

                $object->setParent($parent);
                $object->setPublished(true);
            }

            $slug = u($item[RedaxoRepository::COLUMN_REFERENCE_CATEGORIES_NAME])->lower()->toString();
            $object->setSlug($this->slugger->slug($slug)->toString());

            $this->eventCategoryRepository->persist($object);

            $this->io->writeln('EventCategory imported.');
        }

        return self::SUCCESS;
    }
}
