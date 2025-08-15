<?php

declare(strict_types=1);

namespace App\Controller;

use App\Adapter\App\Database\Doctrine\Repository\BlogpostRepository;
use App\Mapper\BlogpostMapper;
use App\Service\BlogpostService;
use Pimcore\Model\DataObject\Collection;
use Pimcore\Model\DataObject\Tour;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class BlogpostController.
 */
class BlogpostController extends BaseController
{
    public function __construct(
        private readonly BlogpostRepository $blogpostRepository,
        private readonly BlogpostMapper $blogpostMapper,
        private readonly BlogpostService $blogpostService,
    ) {
    }

    public function listAction(Request $request): Response
    {
        $paramBag = $this->getAllParameters($request);

        $collection = $this->document?->getEditable('collection')?->getElement();

        if ($collection instanceof Collection) {
            $blogposts = $this->blogpostService->getBlogpostsByCollection($collection);
        }

        return $this->render('content/blogpost/list.html.twig', array_merge($paramBag, [
            'blogposts' => $blogposts ?? [],
        ]));
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
