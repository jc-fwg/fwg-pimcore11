<?php

declare(strict_types=1);

namespace App\Adapter\App\Database\Doctrine\Repository;

use Pimcore\Db;
use Pimcore\Model\Asset;

class AssetRepository extends AbstractRepository
{
    public const string ASSETS_METADATA_NAME_REDAXO_ID = 'redaxoId';
    public const string ASSETS_METADATA_NAME_REDAXO_ARTICLE_SLICE_ID = 'redaxoArticleSliceId';

    /**
     * @throws \Doctrine\DBAL\Exception
     */
    public function findOneByRedaxoId(string $redaxoId): array|false
    {
        $query = sprintf('
            SELECT * FROM assets
            LEFT JOIN assets_metadata ON assets.id = assets_metadata.cid
            WHERE assets_metadata.name = "%s" AND assets_metadata.data = "%s"
            ',
            self::ASSETS_METADATA_NAME_REDAXO_ID,
            $redaxoId
        );

        return Db::get()->fetchAssociative($query);
    }

    /**
     * @throws \Doctrine\DBAL\Exception
     */
    public function findOneByFilenameAndRedaxoArticleSliceId(string $filename, string $redaxoArticleSliceId): ?Asset\Image
    {
        $query = sprintf('
            SELECT * FROM assets
            LEFT JOIN assets_metadata ON assets.id = assets_metadata.cid
            WHERE
                assets.type = "image" AND
                assets.filename = "%s" AND
                assets_metadata.name = "%s" AND
                assets_metadata.data = "%s"
            ',
            $filename,
            self::ASSETS_METADATA_NAME_REDAXO_ARTICLE_SLICE_ID,
            $redaxoArticleSliceId
        );

        $result = Db::get()->fetchAssociative($query);

        return match (true) {
            is_array($result) => Asset\Image::getById($result['id']),
            default => null,
        };
    }
}
