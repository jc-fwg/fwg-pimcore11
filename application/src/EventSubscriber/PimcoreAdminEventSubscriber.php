<?php

declare(strict_types=1);

namespace App\EventSubscriber;

use Pimcore\Event\BundleManager\PathsEvent;
use Pimcore\Event\BundleManagerEvents;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * @internal
 *
 * @codeCoverageIgnore Class for Pimcore Javascript & CSS loading.
 */
final class PimcoreAdminEventSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            BundleManagerEvents::JS_PATHS  => 'addJSFiles',
            BundleManagerEvents::CSS_PATHS => 'addCSSFiles',
        ];
    }

    public function addJSFiles(PathsEvent $event): void
    {
        $event->setPaths(
            array_merge(
                $event->getPaths(),
                [
                    '/admin-static/js/fwg/collection.js',
                ]
            )
        );
    }

    public function addCssFiles(PathsEvent $event): void
    {
        $event->setPaths(
            array_merge(
                $event->getPaths(),
                [
                    // Custom admin styles
                    '/admin-static/css/custom.css',
                ]
            )
        );
    }
}
