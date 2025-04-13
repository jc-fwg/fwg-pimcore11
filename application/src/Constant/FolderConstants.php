<?php

namespace App\Constant;

class FolderConstants
{
    public const string ASSET_EVENTS = '/Events';
    public const string ASSET_EVENTS_NOT_RELATED = self::ASSET_EVENTS . '/00 - Ohne Zuordnung';
    public const string ASSET_MATERIAL = '/Material';
    public const string ASSET_MATERIAL_LISTS = '/Materiallisten';
    public const string ASSET_WEBSITE = '/Website';
    public const string DOCUMENT_ERROR = '/error';
    public const string DOCUMENT_INCLUDES = '/includes';
    public const string DOCUMENT_META = '/meta';


    public const string OBJECT_EVENTS = '/Events';
    public const string OBJECT_EVENTS_EVENTS = self::OBJECT_EVENTS . '/Events';
    public const string OBJECT_EVENTS_EVENTS_INACTIVE = self::OBJECT_EVENTS . '/Events (inaktiv)';
    public const string OBJECT_EVENTS_CATEGORIES = self::OBJECT_EVENTS . '/Kategorien';
    public const string OBJECT_EVENTS_CUSTOMER = self::OBJECT_EVENTS . '/Kunden';
    public const string OBJECT_EVENTS_LOCATIONS = self::OBJECT_EVENTS . '/Locations';
    public const string OBJECT_MATERIAL = '/Material';
    public const string OBJECT_MATERIAL_CATEGORIES   = self::OBJECT_MATERIAL . '/Kategorien';
    public const string OBJECT_MATERIAL_MANUFACTURERS   = self::OBJECT_MATERIAL . '/Hersteller';
    public const string OBJECT_MATERIAL_MATERIAL   = self::OBJECT_MATERIAL . '/Material';
    public const string OBJECT_MATERIAL_MATERIAL_INACTIVE   = self::OBJECT_MATERIAL . '/Material (inaktiv)';
}
