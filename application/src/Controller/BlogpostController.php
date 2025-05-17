<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\Translation\TranslatorInterface;
use Pimcore\Model\DataObject\Blogpost;
use Pimcore\Model\DataObject\Tour;
use Pimcore\Config\Config;
use App\Helper\ContentHelper;

/**
 * Class BlogpostController
 * @package AppBundle\Controller
 */
class BlogpostController extends BaseController
{
    private $blogpost;

    /** @var Tour|null $tour */
    private $tour;

    /**
     * @Route("{_locale}/{topic}/{blogposttitle}~bp{blogpost}",
     *      name="blogpost-detail",
     *      locale="de",
     *      requirements={"topic"="[\w-]+", "blogposttitle"="[\w-]+", "bp"="\d+", "_locale": "[\w]*"})
     * @param Request $request
     * @param Config $websiteConfig
     * @param TranslatorInterface $translator
     */
    public function blogpostAction(
        Request $request,
        Config $websiteConfig,
        TranslatorInterface $translator
    )
    {
        $paramBag = $this->getAllParameters($request);

        /** @var Blogpost $blogpost */
        $this->blogpost = Blogpost::getById($request->get('blogpost'));

        if ($this->blogpost) {
            $this->tour = $this->blogpost->getBlogpostTour();

            $paramBag['blogpost'] = $this->blogpost;
            $paramBag['tour'] = $this->tour;
            $paramBag['title'] = $this->blogpost->getBlogpostTitle();
            $paramBag['headTitle'] = $this->blogpost->getBlogpostTitle();
            $paramBag['heroImage'] = $this->blogpost->getBlogpostHeroImage();
            $paramBag['badges'] = $this->fetchBadges();
            $paramBag['facts'] = $this->fetchFacts();
        }

        return $this->render('page/blogpost.html.twig', $paramBag);
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
