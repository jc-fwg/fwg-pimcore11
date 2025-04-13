<?php

declare(strict_types=1);

namespace App\Tool;

use Pimcore\Model\DataObject\SiteConfig;

class SiteConfigTool
{
    private static ?SiteConfig $siteConfig = null;

    public static function getSiteConfig(): SiteConfig
    {
        if (self::$siteConfig instanceof SiteConfig) {
            return self::$siteConfig;
        }

        $listing = new SiteConfig\Listing();

        $siteConfig = $listing->current();

        if (!$siteConfig instanceof SiteConfig) {
            throw new \RuntimeException('No SiteConfig found');
        }

        self::$siteConfig = $siteConfig;

        return self::$siteConfig;
    }

    /** @return string[] */
    public static function getEmailsSeperatedFromString(?string $emailList, string $separator = "\n"): array
    {
        if (empty($emailList)) {
            return [];
        }

        $mails = explode($separator, $emailList);

        return array_filter($mails, function($mail) {
            $mail = trim($mail);

            if (filter_var($mail, FILTER_VALIDATE_EMAIL)) {
                return $mail;
            }
        });
    }
}
