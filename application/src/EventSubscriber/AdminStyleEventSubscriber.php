<?php

declare(strict_types=1);

namespace App\EventSubscriber;

use App\Service\BlogpostService;
use Pimcore\Bundle\AdminBundle\Event\AdminEvents;
use Pimcore\Bundle\AdminBundle\Event\ElementAdminStyleEvent;
use Pimcore\Model\DataObject;
use Pimcore\Model\Element\AdminStyle;

class AdminStyleEventSubscriber extends AbstractEventSubscriber
{
    public function __construct(
        private readonly BlogpostService $blogpostService,
    )
    {
    }

    /** @codeCoverageIgnore  */
    public static function getSubscribedEvents(): array
    {
        return [
            AdminEvents::RESOLVE_ELEMENT_ADMIN_STYLE => [
                ['blogpostDataQuality', 0],
            ],
        ];
    }

    /**
     * @throws \Exception
     */
    public function blogpostDataQuality(ElementAdminStyleEvent $event): void
    {
        $element = $event->getElement();

        if (!$element instanceof DataObject\Blogpost) {
            return;
        }

        if ($this->blogpostService->hasDataQualityIssues($element) === false) {;
            return;
        }

        $adminStyle = new AdminStyle($element);

        DataObject\Service::useInheritedValues(true, function () use ($element, $adminStyle,) {
            $elementIcon = '/bundles/pimcoreadmin/img/twemoji/1f6a6.svg';
            $adminStyle->setElementCssClass(false);
            $adminStyle->setElementIcon($elementIcon);
        });

        $event->setAdminStyle($adminStyle);
    }
}
