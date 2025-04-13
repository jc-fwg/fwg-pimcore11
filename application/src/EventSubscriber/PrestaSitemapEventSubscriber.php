<?php

declare(strict_types=1);

namespace App\EventSubscriber;

use App\Service\EventService;
use App\Service\RentalService;
use App\Tool\SiteConfigTool;
use Pimcore\Model\Document;
use Pimcore\Model\Document\Link;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Presta\SitemapBundle\Event\SitemapPopulateEvent;
use Presta\SitemapBundle\Service\UrlContainerInterface;
use Presta\SitemapBundle\Sitemap\Url\UrlConcrete;

class PrestaSitemapEventSubscriber implements EventSubscriberInterface
{
    public function __construct(
        private readonly array $routerContext,
        private readonly EventService $eventService,
        private readonly RentalService $rentalService,
    )
    {
    }

    /**
     * @inheritdoc
     */
    public static function getSubscribedEvents(): array
    {
        return [
            SitemapPopulateEvent::class => 'populate',
        ];
    }

    public function populate(SitemapPopulateEvent $event): void
    {
        $this->registerEventUrls($event->getUrlContainer(), $event->getUrlGenerator());
        $this->registerEventListsUrls($event->getUrlContainer(), $event->getUrlGenerator());
        $this->registerRentalObjectUrls($event->getUrlContainer(), $event->getUrlGenerator());
        $this->registerCmsContentUrls($event->getUrlContainer(), $event->getUrlGenerator());
    }

    public function registerEventUrls(UrlContainerInterface $urls, UrlGeneratorInterface $router): void
    {
        $items = $this->eventService->getEventsByEventCategoryOrderedByHistory();

        foreach ($items as $item) {
            $urls->addUrl(
                new UrlConcrete(
                    $router->generate(
                        'events_details',
                        ['slug' => $item->event->getSlug()],
                        UrlGeneratorInterface::ABSOLUTE_URL
                    )
                ),
                'events'
            );
        }
    }

    public function registerEventListsUrls(UrlContainerInterface $urls, UrlGeneratorInterface $router): void
    {
        $items = $this->eventService->getEventCategoriesWithPublishedEvents();

        foreach ($items as $item) {
            $urls->addUrl(
                new UrlConcrete(
                    $router->generate(
                        'events_list_category',
                        ['slug' => $item['slug']],
                        UrlGeneratorInterface::ABSOLUTE_URL
                    )
                ),
                'events'
            );
        }
    }

    public function registerRentalObjectUrls(UrlContainerInterface $urls, UrlGeneratorInterface $router): void
    {
        $items = $this->rentalService->getRentalObjects();
        foreach ($items as $item) {
            $urls->addUrl(
                new UrlConcrete(
                    $router->generate(
                        'rental_details',
                        ['slug' => $item->rentalObject->getSlug()],
                        UrlGeneratorInterface::ABSOLUTE_URL
                    )
                ),
                'material'
            );
        }
    }

    public function registerCmsContentUrls(UrlContainerInterface $urls, UrlGeneratorInterface $router): void
    {
        $siteConfig = SiteConfigTool::getSiteConfig();

        $staticPages = $siteConfig->getSitemapStaticPages();

        foreach ($staticPages as $staticPage) {

            $adds = match($staticPage->hasChildren()) {
                false => [$staticPage],
                true =>
                    $staticPage->getChildren()->load()
                ,
            };

            foreach($adds as $add) {
                $urls->addUrl(
                    new UrlConcrete(sprintf(
                            '%s://%s%s',
                            $this->routerContext['scheme'],
                            $this->routerContext['host'],
                            $add->getPrettyUrl() ?? $add->getFullPath()
                        )
                    ),
                    'cms'
                );
            }

            /** @var Document|Link $element */

        }
    }
}
