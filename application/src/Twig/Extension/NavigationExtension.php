<?php

declare(strict_types=1);

namespace App\Twig\Extension;

use App\Service\NavigationService;
use Exception;
use Pimcore\Model\DataObject\Collection;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class NavigationExtension extends AbstractExtension
{
    public function __construct(
        private readonly NavigationService $navigationService,
    ) {
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('getMainNavigation', [$this, 'getMainNavigation']),
        ];
    }

    /**
     * @return array<string, Collection[]>
     *
     * @throws Exception
     */
    public function getMainNavigation(): array
    {
        return $this->navigationService->getMainNavigation();
    }
}
