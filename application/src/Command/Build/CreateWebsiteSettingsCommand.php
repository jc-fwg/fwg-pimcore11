<?php

declare(strict_types=1);

namespace App\Command\Build;

use Pimcore\Console\AbstractCommand;
use Pimcore\Model\Asset\Service as AssetService;
use Pimcore\Model\Document\Service as DocumentService;
use Pimcore\Model\DataObject\Service as DataObjectService;
use Pimcore\Model\WebsiteSetting;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'app:build:create-website-settings',
    description: 'Creates default website settings.'
)]
class CreateWebsiteSettingsCommand extends AbstractCommand
{
    private const string MESSAGE_GENERATE_TYPE_WEBSITE_SETTINGS = "Generating %s website settings...";
    private const string MESSAGE_ALREADY_EXISTS = '...already exists.';
    private const string MESSAGE_SUCCESSFUL = '...successful.';

    public function __construct(
        ?string $name = null,
        private readonly ?array $assetWebsiteSettings = null,
        private readonly ?array $checkboxWebsiteSettings = null,
        private readonly ?array $documentWebsiteSettings = null,
        private readonly ?array $objectWebsiteSettings = null,
        private readonly ?array $textWebsiteSettings = null,
    )
    {
        parent::__construct($name);
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $this->createWebsiteSettings($this->assetWebsiteSettings, 'asset');
        $this->createWebsiteSettings($this->checkboxWebsiteSettings, 'checkbox');
        $this->createWebsiteSettings($this->documentWebsiteSettings, 'document');
        $this->createWebsiteSettings($this->objectWebsiteSettings, 'object');
        $this->createWebsiteSettings($this->textWebsiteSettings, 'text');

        return self::SUCCESS;
    }

    /**
     * @param string[] $websiteSettings
     * @throws \Exception
     */
    private function createWebsiteSettings(?array $websiteSettings, string $type): void
    {
        if (is_array($websiteSettings)) {
            $this->writeInfo(sprintf(self::MESSAGE_GENERATE_TYPE_WEBSITE_SETTINGS, $type));

            foreach ($websiteSettings as $websiteSettingName) {
                $this->writeInfo('...' . $websiteSettingName . '...');

                $websiteSetting = WebsiteSetting::getByName($websiteSettingName);
                if ($websiteSetting instanceof WebsiteSetting) {
                    $this->writeInfo(self::MESSAGE_ALREADY_EXISTS);
                    continue;
                }

                $websiteSetting = new WebsiteSetting();
                $websiteSetting->setName($websiteSettingName);
                $websiteSetting->setType($type);
                $websiteSetting->save();

                $this->writeInfo(self::MESSAGE_SUCCESSFUL);
            }
        }
    }
}
