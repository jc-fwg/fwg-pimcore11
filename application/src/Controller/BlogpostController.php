<?php

namespace App\Controller;

use App\Adapter\App\Database\Doctrine\Repository\BlogpostRepository;
use App\Mapper\BlogpostMapper;
use Symfony\Bridge\Twig\Attribute\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\Translation\TranslatorInterface;
use Pimcore\Model\DataObject\Blogpost;
use Pimcore\Model\DataObject\Tour;
use Pimcore\Config\Config;
use App\Helper\ContentHelper;

/**
 * Class BlogpostController
 */
class BlogpostController extends BaseController
{
    public function __construct(
        private readonly BlogpostRepository $blogpostRepository,
        private readonly BlogpostMapper $blogpostMapper,
    )
    {
    }

    #[Template('content/blogpost/blogpost.html.twig')]
    #[Route(
        '/{topic}/{slug}',
        name: 'blogpost-detail',
        requirements: [
            'topic' => '[\w-]+',
            'slug' => '[\w-]+',
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

    /**
     * @return array
     */
    private function fetchBadges(): array
    {
        $badges = [];

        // Badges : Geo data from tour
        if ($this->tour) {
            $tourRegions = $this->tour->getTourGeoRegions();
            $tourGeoData = [
                'countries' => [],
                'regions' => [],
                'states' => [],
            ];

            foreach ($tourRegions as $region) {
                /** var GeoRegion $region */
                $tourGeoData['regions'][] = $region->getGeoRegionTitle();

                // Countries
                $countries = $region->getGeoRegionCountries();
                foreach ($countries as $country) {
                    /** var GeoCountry $country */
                    $tourGeoData['countries'][] = $country->getGeoCountryTitle();
                }

                // States (if available)
                $states = $region->getGeoRegionStates();
                foreach ($states as $state) {
                    /** var GeoState $state */
                    $tourGeoData['states'][] = $state->getGeoStateTitle();
                }
            }

            // Override countries and states if tour has own relations
            if ($this->tour->getTourGeoCountries()) {
                $tourGeoData['countries'] = [];
                foreach ($this->tour->getTourGeoCountries() as $country) {
                    $tourGeoData['countries'][] = $country->getGeoCountryTitle();
                }
            }
            if ($this->tour->getTourGeoStates()) {
                $tourGeoData['states'] = [];
                foreach ($this->tour->getTourGeoStates() as $state) {
                    $tourGeoData['states'][] = $state->getGeoStateTitle();
                }
            }

            $badges['tourGeoData'] = array_merge(
                $tourGeoData['regions'],
                $tourGeoData['countries'],
                $tourGeoData['states']
            );

            // Tour tags
            foreach ($this->tour->getTourTags() as $tag) {
                $badges['tourTags'] = $tag->getTagTitle();
            }
        }

        return ContentHelper::flattenArray($badges);
    }

    private function fetchFacts(): array
    {
        $facts = [];

        // Tour facts
        if ($this->tour) {

            // Default facts
            $facts['tour'] = [

                'distance' => (float)$this->tour->getTourFactDistance(),
                'elevation' => (int)$this->tour->getTourFactElevation(),
                'duration' => (float)$this->tour->getTourFactDuration(),
                'pauses' => (string)$this->tour->getTourFactPauses(),
                'orientation' => (string)$this->tour->getTourFactOrientation(),
                'start' => $this->tour->getTourStart(),
                'startTitle' => $this->tour->getTourStartTitle(),
                'end' => $this->tour->getTourEnd(),
                'endTitle' => $this->tour->getTourEndTitle(),
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
