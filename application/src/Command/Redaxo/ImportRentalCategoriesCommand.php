<?php

declare(strict_types=1);

namespace App\Command\Redaxo;

use App\Adapter\App\Database\Doctrine\Repository\EventCategoryRepository;
use App\Adapter\App\Database\Doctrine\Repository\RentalCategoryRepository;
use App\Adapter\Redaxo\Database\Doctrine\Repository\RedaxoRepository;
use App\Constant\FolderConstants;
use Pimcore\Console\AbstractCommand;
use Pimcore\Model\DataObject\AbstractObject;
use Pimcore\Model\DataObject\EventCategory;
use Pimcore\Model\DataObject\RentalCategory;
use Pimcore\Model\DataObject\Service;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'app:import:redaxo-rental-categories',
    description: 'Imports rental categories from Redaxo database and creates RentalCategory objects.'
)]
class ImportRentalCategoriesCommand extends AbstractCommand
{
    public function __construct(
        private readonly RedaxoRepository         $redaxoRepository,
        private readonly RentalCategoryRepository $rentalCategoryRepository,
        ?string                                   $name = null,
    )
    {
        parent::__construct($name);
    }


    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $this->io->title('Importing rental categories from Redaxo database...');

        $redaxoItems = $this->redaxoRepository->getRentalCategories();

        $parent = Service::createFolderByPath(FolderConstants::OBJECT_MATERIAL_CATEGORIES);

        foreach ($redaxoItems as $item) {

            $this->writeInfo(sprintf('Processing rental category: %s (RedaxoID: %s)', $item[RedaxoRepository::COLUMN_RENTAL_CATEGORIES_NAME], $item[RedaxoRepository::COLUMN_RENTAL_CATEGORIES_ID]));

            $object = $this->rentalCategoryRepository->findOneByRedaxoId((string) $item[RedaxoRepository::COLUMN_RENTAL_CATEGORIES_ID], false);

            if ($object instanceof RentalCategory) {
                $this->io->writeln('RentalCategory already exists. Skipping...');
                continue;
            }

            $object = new RentalCategory();
            $object->setKey(
                Service::getValidKey($item[RedaxoRepository::COLUMN_RENTAL_CATEGORIES_NAME], AbstractObject::OBJECT_TYPE_OBJECT)
            );
            $object->setParent($parent);
            $object->setPublished(true);

            $object->setRedaxoId((int) $item[RedaxoRepository::COLUMN_RENTAL_CATEGORIES_ID]);

            $this->rentalCategoryRepository->persist($object);

            $this->io->writeln('RentalCategory imported.');
        }

        return self::SUCCESS;
    }
}
