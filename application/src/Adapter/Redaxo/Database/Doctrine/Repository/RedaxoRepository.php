<?php

declare(strict_types=1);

namespace App\Adapter\Redaxo\Database\Doctrine\Repository;

use Doctrine\DBAL\Connection;
use Doctrine\DBAL\Exception;

class RedaxoRepository
{
    private const string TABLE_BRANDS = 'awm_equipment_brand';
    private const string TABLE_OLD_REFERENCES = 'awm_old_referenzen';
    private const string TABLE_OLD_REFERENCES_IMAGES = 'awm_old_referenzen_bilder';
    private const string TABLE_REFERENCE_CATEGORIES = 'awm_reference_category';
    private const string TABLE_RENTAL_CATEGORIES = 'awm_equipment_category';
    private const string TABLE_REX_ARTICLE_SLICE = 'rex_article_slice';

    public const string COLUMN_BRANDS_ID = 'brandId';
    public const string COLUMN_BRANDS_NAME = 'name';
    public const string COLUMN_REFERENCE_CATEGORIES_ID = 'categoryId';
    public const string COLUMN_REFERENCE_CATEGORIES_NAME = 'name';
    public const string COLUMN_OLD_REFERENCES_ID = 'id';
    public const string COLUMN_OLD_REFERENCES_DATE_START = 'datum_von';
    public const string COLUMN_OLD_REFERENCES_DATE_END = 'datum_bis';
    public const string COLUMN_OLD_REFERENCES_HEADLINE = 'headline';
    public const string COLUMN_OLD_REFERENCES_TEXT = 'mengentext';
    public const string COLUMN_OLD_REFERENCES_IMAGES_NAME = 'bildname';
    public const string COLUMN_OLD_REFERENCES_IMAGES_ID = 'id';
    public const string COLUMN_OLD_REFERENCES_IMAGES_EVENT_ID = 'eid';
    public const string COLUMN_RENTAL_CATEGORIES_ID = 'categoryId';
    public const string COLUMN_RENTAL_CATEGORIES_NAME = 'name';
    public const string COLUMN_TABLE_REX_ARTICLE_SLICE_ARTICLE_ID = 'article_id';
    public const string COLUMN_TABLE_REX_ARTICLE_CTYPE_ID = 'ctype_id';
    public const int VALUE_TABLE_REX_ARTICLE_SLICE_ARTICLE_ID_REFERENCES = 10;
    public const int VALUE_TABLE_REX_ARTICLE_SLICE_ARTICLE_ID_MATERIALS = 13;
    public const int VALUE_TABLE_REX_ARTICLE_SLICE_CTYPE_ID_MATERIALS = 1;

    public const string OLD_REFERENCES_IMAGES_URL_PREFIX = 'https://artworldmedia.de/assets/web/images/referenzen/';

    public function __construct(
        private readonly Connection $redaxoDb,
    )
    {
    }

    /**
     * @return array{
     *     brandId: int,
     *     name: string
     * }[]
     * @throws Exception
     */
    public function getBrands(): array
    {
        $items = $this->redaxoDb->executeQuery(sprintf('SELECT * FROM %s', self::TABLE_BRANDS));
        return $items->fetchAllAssociative();
    }

    /**
     * @return array<string, null|int|string>
     * @throws Exception
     */
    public function getReferences(): array
    {
        $items = $this->redaxoDb->executeQuery(
            sprintf(
                'SELECT * FROM %s WHERE %s = %d',
                self::TABLE_REX_ARTICLE_SLICE,
                self::COLUMN_TABLE_REX_ARTICLE_SLICE_ARTICLE_ID,
                self::VALUE_TABLE_REX_ARTICLE_SLICE_ARTICLE_ID_REFERENCES
            ));
        return $items->fetchAllAssociative();
    }

    /**
     * @return array{
     *     categoryId: int,
     *     name: string
     * }[]
     * @throws Exception
     */
    public function getReferenceCategories(): array
    {
        $items = $this->redaxoDb->executeQuery(sprintf('SELECT * FROM %s', self::TABLE_REFERENCE_CATEGORIES));
        return $items->fetchAllAssociative();
    }

    /**
     * @return array{
     *     id: int,
     *     datum_von: string,
     *     datum_bis: string,
     *     headline: string,
     *     mengentext: string
     * }[]
     * @throws Exception
     */
    public function getOldReferences(): array
    {
        $items = $this->redaxoDb->executeQuery(sprintf('SELECT * FROM %s', self::TABLE_OLD_REFERENCES));
        return $items->fetchAllAssociative();
    }

    /**
     * @return array{
     *     id: int,
     *     eid: int,
     *     bildname: string
     * }[]
     * @throws Exception
     */
    public function getOldReferencesImages(): array
    {
        $items = $this->redaxoDb->executeQuery(sprintf('SELECT * FROM %s', self::TABLE_OLD_REFERENCES_IMAGES));
        return $items->fetchAllAssociative();
    }

    /**
     * @return array{
     *     categoryId: int,
     *     name: string
     * }[]
     * @throws Exception
     */
    public function getRentalCategories()
    {
        $items = $this->redaxoDb->executeQuery(sprintf('SELECT * FROM %s', self::TABLE_RENTAL_CATEGORIES));
        return $items->fetchAllAssociative();
    }

    /**
     * @return array<string, null|int|string>
     * @throws Exception
     */
    public function getMaterials(): array
    {
        $items = $this->redaxoDb->executeQuery(
            sprintf(
                'SELECT * FROM %s WHERE %s = %d AND %s = %d',
                self::TABLE_REX_ARTICLE_SLICE,
                self::COLUMN_TABLE_REX_ARTICLE_SLICE_ARTICLE_ID,
                self::VALUE_TABLE_REX_ARTICLE_SLICE_ARTICLE_ID_MATERIALS,
                self::COLUMN_TABLE_REX_ARTICLE_CTYPE_ID,
                self::VALUE_TABLE_REX_ARTICLE_SLICE_CTYPE_ID_MATERIALS
            ));
        return $items->fetchAllAssociative();
    }
}
