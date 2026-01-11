<?php

declare(strict_types=1);

namespace App\Service;

use DOMNode;
use Pimcore\Model\Element\ValidationException;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Throwable;

use function in_array;

readonly class CrawlerService
{
    public function __construct(
        private HttpClientInterface $httpClient,
    ) {
    }

    /**
     * @throws ValidationException
     */
    public function crawlWordpressCityTrip($url): array
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
    public function crawlWordpressLegacyTour($url): array
    {
        $crawler = new Crawler($this->getHtml($url));

        $title = $crawler->filter('h1.entry-title')->first()->text();

        $introductionElements = [];
        $crawler->filter('#ez-toc-container')->previousAll()->each(static function (Crawler $node) use (&$introductionElements): void {
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

    public function crawlExternalUrl(string $url, string $schemeAndHost): array
    {
        try {
            $crawler = new Crawler($this->getHtml($url));
        } catch (Throwable $e) {
            return [];
        }

        $externalUrls = [];

        $crawler->filter('a[href]')->each(function (Crawler $node) use (&$externalUrls, $schemeAndHost): void {
            $url = $node->attr('href');

            if (
                str_starts_with($url, $schemeAndHost)
                || str_starts_with($url, '/')
                || str_starts_with($url, '#')
            ) {
                return;
            }

            try {
                $externalUrls[$this->httpClient->request(Request::METHOD_HEAD, $url)->getStatusCode()][] = [
                    'url'  => $url,
                    'text' => $node->text(),
                ];
            } catch (Throwable) {
                return;
            }
        });

        return $externalUrls;
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
