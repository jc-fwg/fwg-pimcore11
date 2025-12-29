<?php

declare(strict_types=1);

namespace App\Service;

use DOMNode;
use Pimcore\Model\Element\ValidationException;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Throwable;

use function in_array;

readonly class WordpressCrawlerService
{
    public function __construct(
        private HttpClientInterface $httpClient,
    ) {
    }

    /**
     * @throws ValidationException
     */
    public function crawlCityTrip($url): array
    {
        $crawler = new Crawler($this->getHtml($url));

        $title = $crawler->filter('h1.entry-title')->first()->text();

        $introductionElements = [];
        $crawler->filter('#ez-toc-container')->previousAll()->each(static function (Crawler $node) use (&$introductionElements): void {
            $introductionElements[] = $node->text();
        });

        $sections = [];
        $crawler->filter('h2')->each(function (Crawler $h2) use (&$sections): void {
            $headline  = trim($h2->text());
            $textParts = [];
            $links     = [];

            // Start beim nächsten Geschwisterelement nach h2
            $node = $h2->getNode(0)->nextSibling;

            while ($node && !($node->nodeName === 'h2')) {
                // Text sammeln
                if (in_array($node->nodeName, ['p', 'div', 'span'], true)) {
                    $text = $this->getInnerHtml($node);
                    if ($text !== '') {
                        $textParts[] = trim($text);
                    }
                }

                // UL -> Links extrahieren
                if ($node->nodeName === 'ul') {
                    foreach ($node->getElementsByTagName('a') as $a) {
                        $label = trim($a->textContent);
                        $href  = $a->getAttribute('href');

                        if ($label && $href) {
                            $links[] = [
                                'label' => $label,
                                'url'   => $href,
                            ];
                        }
                    }
                }

                // Images bewusst ignorieren
                $node = $node->nextSibling;
            }

            if ($headline && ($textParts || $links)) {

                $text = implode('<p></p>', $textParts);
                $text = str_replace('<p></p><p class="tiled-gallery__row"></p><p></p>', '', $text);

                $sections[] = [
                    'headline' => $headline,
                    'text'     => $text,
                    'links'    => $links,
                ];
            }
        });

        return [
            'title'        => $title,
            'introduction' => implode("\n\n", array_reverse($introductionElements)),
            'sections'     => $sections,
        ];
    }

    /**
     * @throws ValidationException
     */
    public function crawlLegacyTour($url): array
    {
        $crawler = new Crawler($this->getHtml($url));

        $title = $crawler->filter('h1.entry-title')->first()->text();

        $introductionElements = [];
        $crawler->filter('#ez-toc-container')->previousAll()->each(function (Crawler $node) use (&$introductionElements): void {
            $introductionElements[] = $node->text();
        });

        $sections = [];
        $crawler->filter('h2')->each(function (Crawler $h2) use (&$sections): void {
            if (preg_match('/^(Zusammenfassung|One thought)/i', $h2->text())) {
                return;
            }

            $headline  = trim($h2->text());
            $textParts = [];

            // Start beim nächsten Geschwisterelement nach h2
            $node = $h2->getNode(0)->nextSibling;

            while ($node && !($node->nodeName === 'h2')) {
                // Text sammeln
                if (in_array($node->nodeName, ['p', 'div', 'span'], true)) {
                    $text = $this->getInnerHtml($node);
                    if ($text !== '') {
                        $textParts[] = trim($text);
                    }
                }
                // Images bewusst ignorieren
                $node = $node->nextSibling;
            }

            $text = implode('<p></p>', $textParts);

            $text = str_replace('<p></p><p class="tiled-gallery__row"></p><p></p>', '', $text);

            if (trim($headline) !== '' && trim($text) !== '') {
                $sections[] = [
                    'headline' => $headline ?? '',
                    'text'     => $text ?? '',
                ];
            }
        });

        return [
            'title'        => $title,
            'introduction' => implode("\n\n", array_reverse($introductionElements)),
            'sections'     => $sections,
        ];
    }

    /**
     * @throws ValidationException
     */
    private function getHtml($url): string
    {
        try {
            $response = $this->httpClient->request('GET', $url);

            return $response->getContent();
        } catch (Throwable $e) {
            throw new ValidationException($e->getMessage());
        }
    }

    private function getInnerHtml(DOMNode $node): string
    {
        $html = '';

        foreach ($node->childNodes as $child) {
            $html .= $node->ownerDocument->saveHTML($child);
        }

        return trim($html);
    }
}
