<?php

declare(strict_types=1);

namespace App\EventSubscriber;

use Pimcore\Bundle\AdminBundle\Event\AdminEvents;
use Pimcore\Bundle\AdminBundle\Event\ElementAdminStyleEvent;
use Pimcore\Model\DataObject;
use Pimcore\Model\Element\AdminStyle;

class AdminStyleEventSubscriber extends AbstractEventSubscriber
{
    /** @codeCoverageIgnore  */
    public static function getSubscribedEvents(): array
    {
        return [
            AdminEvents::RESOLVE_ELEMENT_ADMIN_STYLE => [
                ['redaxoReferencesCustomIcon', 0],
            ],
        ];
    }

    public function redaxoReferencesCustomIcon(ElementAdminStyleEvent $event): void
    {
        $element = $event->getElement();

        if (!$element instanceof DataObject\Event) {
            return;
        }

        if (
            $element->getRedaxoId() === null
            && $element->getRedaxoArticleSliceId() === null
        ) {
            return;
        }

        $adminStyle = new AdminStyle($element);

        $elementIcon = match (true) {
            $element->getRedaxoArticleSliceId() !== null => '/bundles/pimcoreadmin/img/flat-color-icons/calendar.svg',
            $element->getRedaxoId() !== null             => '/bundles/pimcoreadmin/img/flat-color-icons/overtime.svg',
            default                                      => null,
        };

        DataObject\Service::useInheritedValues(true, static function () use ($adminStyle, $elementIcon): void {
            $adminStyle->setElementCssClass(false);
            $adminStyle->setElementIcon($elementIcon);
        });

        $event->setAdminStyle($adminStyle);
    }
}
