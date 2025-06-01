<?php

declare(strict_types=1);

namespace App\Command\Composer;

use Pimcore\Bundle\CoreBundle\Command\Bundle\AbstractBundleCommand;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Throwable;

#[AsCommand(
    name: 'app:composer:install-bundles',
    description: 'Install given bundles if not installed yet.'
)]
class InstallBundlesCommand extends AbstractBundleCommand
{
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $bundles = require 'config/bundles.php';

        $this->writeInfo('Trying to install bundles');

        foreach ($bundles as $bundleClass => $bundleConfig) {
            try {
                $bundle = $this->bundleManager->getActiveBundle($bundleClass, false);
            } catch (Throwable $e) {
                $this->writeError($e->getMessage());
                continue;
            }

            if ($this->bundleManager->isInstalled($bundle) === true) {
                $this->writeInfo($bundleClass.' is already installed. Skipping.');
                continue;
            }

            $this->bundleManager->install($bundle);

            $this->writeInfo($bundleClass.' successfully installed.');
        }

        return self::SUCCESS;
    }
}
