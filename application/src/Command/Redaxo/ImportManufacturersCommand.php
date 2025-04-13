<?php

declare(strict_types=1);

namespace App\Command\Redaxo;

use App\Adapter\App\Database\Doctrine\Repository\ManufacturerRepository;
use App\Adapter\Redaxo\Database\Doctrine\Repository\RedaxoRepository;
use App\Constant\FolderConstants;
use Pimcore\Console\AbstractCommand;
use Pimcore\Model\DataObject\AbstractObject;
use Pimcore\Model\DataObject\Manufacturer;
use Pimcore\Model\DataObject\Service;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'app:import:redaxo-manufacturers',
    description: 'Imports brands from Redaxo database as Manufacturer objects.'
)]
class ImportManufacturersCommand extends AbstractCommand
{
    public function __construct(
        private readonly RedaxoRepository       $redaxoRepository,
        private readonly ManufacturerRepository $brandRepository,
        ?string                                 $name = null,
    )
    {
        parent::__construct($name);
    }


    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $this->io->title('Importing brands from Redaxo database...');

        $brands = $this->redaxoRepository->getBrands();

        $brandsParent = Service::createFolderByPath(FolderConstants::OBJECT_MATERIAL_MANUFACTURERS);

        foreach ($brands as $brand) {

            $this->writeInfo(sprintf('Processing brand: %s (RedaxoID: %s)', $brand[RedaxoRepository::COLUMN_BRANDS_NAME], $brand[RedaxoRepository::COLUMN_BRANDS_ID]));

            $object = $this->brandRepository->findOneByRedaxoId((string) $brand[RedaxoRepository::COLUMN_BRANDS_ID], false);

            if ($object instanceof Brand) {
                $this->io->writeln('Brand already exists.Skipping...');
                continue;
            }

            $object = new Manufacturer();
            $object->setKey(
                Service::getValidKey($brand[RedaxoRepository::COLUMN_BRANDS_NAME], AbstractObject::OBJECT_TYPE_OBJECT)
            );
            $object->setParent($brandsParent);
            $object->setPublished(true);

            $object->setRedaxoId((int) $brand[RedaxoRepository::COLUMN_BRANDS_ID]);

            $this->brandRepository->persist($object);

            $this->io->writeln('Brand imported as Manufacturer.');
        }

        return self::SUCCESS;
    }
}
