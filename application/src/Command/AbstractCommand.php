<?php

declare(strict_types=1);

namespace App\Command;

use Exception;
use App\Adapter\App\Database\Doctrine\Repository\AssetRepository;
use Pimcore\Console\AbstractCommand as PimcoreAbstractCommand;
use Pimcore\Model\Asset\Folder;
use Pimcore\Model\Asset\Image;
use Pimcore\Model\Tool\SettingsStore;
use Symfony\Component\Process\Exception\RuntimeException;

abstract class AbstractCommand extends PimcoreAbstractCommand
{
    private const string REDAXO_MEDIA_URL_PREFIX = 'https://artworldmedia.de/media/';

    protected readonly AssetRepository $assetRepository;

    public function __construct(
        ?string $name = null
    ) {
        $this->assetRepository = new AssetRepository();
        parent::__construct($name);
    }

    /**
     * @throws \RuntimeException
     */
    public function checkExecuted(): void
    {
        $executed = SettingsStore::get(static::class);

        if ($executed instanceof SettingsStore) {
            throw new RuntimeException('Command already marked as executed in settings store');
        }
    }

    /**
     * @codeCoverageIgnore
     *
     * @throws Exception
     */
    public function markExecuted(): void
    {
        SettingsStore::set(static::class, true);
    }

    protected function getOrCreateAsset(string $filename, string $articleSliceId, Folder $parent): ?Image
    {
        $asset = $this->assetRepository->findOneByFilenameAndRedaxoArticleSliceId($filename, $articleSliceId);

        if ($asset instanceof Image) {
            return $asset;
        }

        // Get image by URL
        $imageUrl = sprintf('%s%s', self::REDAXO_MEDIA_URL_PREFIX, $filename);

        try {
            $this->io->writeln(sprintf('...downloading image (%s)...', $imageUrl));
            $imageData = file_get_contents($imageUrl);
        } catch (\Exception $e) {
            $this->io->error('...image not downloadable. Skipping...');

            return null;
        }

        $asset = new Image();
        $asset->setParent($parent);
        $asset->setKey($filename);
        $asset->setData($imageData);

        $asset->addMetadata(
            AssetRepository::ASSETS_METADATA_NAME_REDAXO_ARTICLE_SLICE_ID,
            'input',
            $articleSliceId
        );

        $asset->save();

        return $asset;
    }
}
