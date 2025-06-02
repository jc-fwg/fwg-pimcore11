<?php

declare(strict_types=1);

namespace App\Controller;

use App\Adapter\App\Database\Doctrine\Repository\BlogpostRepository;
use App\Helper\ContentHelper;
use App\Mapper\BlogpostMapper;
use Pimcore\Model\DataObject\Tour;
use Symfony\Bridge\Twig\Attribute\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class BlogpostController.
 */
class BlogpostController extends BaseController
{
    public function __construct(
        private readonly BlogpostRepository $blogpostRepository,
        private readonly BlogpostMapper $blogpostMapper,
    ) {
    }

    #[Template('content/blogpost/blogpost.html.twig')]
    #[Route(
        '/{topic}/{slug}',
        name: 'blogpost-detail',
        requirements: [
            'topic' => '[\w-]+',
            'slug'  => '[\w-]+',
        ],
    )]
    public function blogpostAction(string $slug, Request $request): array
    {
        $blogpost = $this->blogpostRepository->getBySlug($slug);

        $paramBag = $this->getAllParameters($request);

        return array_merge($paramBag, [
            'blogpost' => $this->blogpostMapper->fromModel($blogpost),
        ]);
    }

    private function fetchFacts(): array
    {
        $facts = [];

        // Tour facts
        if ($this->tour) {
            // Default facts
            $facts['tour'] = [
                'distance'    => (float) $this->tour->getTourFactDistance(),
                'elevation'   => (int) $this->tour->getTourFactElevation(),
                'duration'    => (float) $this->tour->getTourFactDuration(),
                'pauses'      => (string) $this->tour->getTourFactPauses(),
                'orientation' => (string) $this->tour->getTourFactOrientation(),
                'start'       => $this->tour->getTourStart(),
                'startTitle'  => $this->tour->getTourStartTitle(),
                'end'         => $this->tour->getTourEnd(),
                'endTitle'    => $this->tour->getTourEndTitle(),
                'orientation' => $this->tour->getTourFactOrientation(),
            ];

            // Brick : Hike
            if ($this->tour->getTourAdditionalFacts()->getTourFactsHike()) {
                $facts['tour'] = array_merge($facts['tour'], [
                    'headForHeights' => $this->tour->getTourAdditionalFacts()->getTourFactsHike()->getTourFactHeadForHeights(),
                    'surefootedness' => $this->tour->getTourAdditionalFacts()->getTourFactsHike()->getTourFactSurefootedness(),
                ]);
            }

            // Brick : Bike
            if ($this->tour->getTourAdditionalFacts()->getTourFactsBike()) {
                $facts['tour'] = array_merge($facts['tour'], [
                    'singletrailScale' => $this->tour->getTourAdditionalFacts()->getTourFactsBike()->getTourFactSingletrailScale(),
                ]);
            }
        }

        return $facts;
    }
}
