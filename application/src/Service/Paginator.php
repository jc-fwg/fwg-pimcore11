<?php

declare(strict_types=1);

namespace App\Service;

use App\ValueObject\Paginator\PaginationValueObject;
use Pimcore\Model\DataObject\Listing;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class Paginator
{
    private const int DEFAULT_ITEMS_PER_PAGE = 10;
    private const int DEFAULT_CURRENT_PAGE   = 1;
    private const int DEFAULT_RANGE          = 3;

    public function __construct(
        private readonly UrlGeneratorInterface $urlGenerator,
        private readonly RequestStack $requestStack,
    ) {
    }

    public function getPagination(
        Listing $listing,
        ?int $itemsPerPage = null,
        ?int $currentPage = null,
        ?int $range = null,
    ): PaginationValueObject {
        $itemsPerPage ??= self::DEFAULT_ITEMS_PER_PAGE;
        $currentPage ??= self::DEFAULT_CURRENT_PAGE;
        $range ??= self::DEFAULT_RANGE;

        $totalItems = $listing->count();
        $totalPages = (int) ceil($totalItems / $itemsPerPage);
        $startIndex = ($currentPage - 1) * $itemsPerPage;

        $rangeStart = max(1, $currentPage - $range);
        $rangeEnd   = min($totalPages, $currentPage + $range);

        $queryString = $this->urlGenerator->generate(
            $this->requestStack->getCurrentRequest()->attributes->get('_route'),
            array_merge(
                $this->requestStack->getCurrentRequest()?->query->all() ?? [],
                ['page' => 'cp']
            )
        );

        $queryString = str_replace('page=cp', 'page=', $queryString);

        return new PaginationValueObject(
            items: $listing->getItems($startIndex, $itemsPerPage),
            totalItems: $totalItems,
            itemsPerPage: $itemsPerPage,
            currentPage: $currentPage,
            totalPages: $totalPages,
            rangeStart: $rangeStart,
            rangeEnd: $rangeEnd,
            queryString: $queryString,
        );
    }
}
