<?php

declare(strict_types=1);

namespace App\Command\Build;

use Pimcore\Console\AbstractCommand;
use Pimcore\Model\Asset\Service as AssetService;
use Pimcore\Model\DataObject\Service as DataObjectService;
use Pimcore\Model\Document\Service as DocumentService;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

use function is_array;

#[AsCommand(
    name: 'app:build:create-folders',
    description: 'Creates default folders.'
)]
class CreateFoldersCommand extends AbstractCommand
{
    public function __construct(
        ?string $name = null,
        private readonly ?array $assetFolders = null,
        private readonly ?array $documentFolders = null,
        private readonly ?array $dataObjectFolders = null,
    ) {
        parent::__construct($name);
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        if (is_array($this->assetFolders)) {
            $this->writeInfo('Generating asset folders...');

            foreach ($this->assetFolders as $folder) {
                $this->writeInfo('Creating folder: '.$folder);
                AssetService::createFolderByPath($folder);
            }
        }

        if (is_array($this->documentFolders)) {
            $this->writeInfo('Generating document folders...');

            foreach ($this->documentFolders as $folder) {
                $this->writeInfo('Creating folder: '.$folder);
                DocumentService::createFolderByPath($folder);
            }
        }

        if (is_array($this->dataObjectFolders)) {
            $this->writeInfo('Generating data object folders...');

            foreach ($this->dataObjectFolders as $folder) {
                $this->writeInfo('Creating folder: '.$folder);
                DataObjectService::createFolderByPath($folder);
            }
        }

        return self::SUCCESS;
    }
}
