<?php

declare(strict_types=1);

namespace App\Constant;

class FolderConstants
{
    public const string ASSET_BLOGPOSTS           = '/Blogposts';
    public const string ASSET_BLOGPOSTS_DELETED   = self::ASSET_BLOGPOSTS.' Deleted';
    public const string ASSET_WEBSITE             = '/Website';
    public const string ASSET_WEBSITE_HERO_IMAGES = self::ASSET_WEBSITE.'/Hero Images';

    public const string OBJECT_ACTIVITIES   = '/Activities';
    public const string OBJECT_CATEGORIES   = '/Categories';
    public const string OBJECT_BLOGPOSTS    = '/Blogposts';
    public const string OBJECT_HASHTAG_SETS = '/Hashtag Sets';
    public const string OBJECT_LOCALIZING   = '/Localizing';
}
