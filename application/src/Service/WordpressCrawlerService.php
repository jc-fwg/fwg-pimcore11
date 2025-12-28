<?php

namespace App\Service;

use Pimcore\Model\Element\ValidationException;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Component\DomCrawler\Crawler;

class WordpressCrawlerService
{
    public function __construct(
        private readonly HttpClientInterface $httpClient,
    )
    {
    }

    /**
     * @throws ValidationException
     */
    public function crawlCityTrip($url): array
    {
        $html = $this->getHtml($url);

        $crawler = new Crawler($html);
        $sections = [];

        $crawler->filter('h2')->each(function (Crawler $h2) use (&$sections) {

            $headline = trim($h2->text());
            $textParts = [];
            $links = [];

            // Start beim nächsten Geschwisterelement nach h2
            $node = $h2->getNode(0)->nextSibling;

            while ($node && !($node->nodeName === 'h2')) {

                // Text sammeln
                if (in_array($node->nodeName, ['p', 'div', 'span'])) {
                    $text = trim($node->textContent);
                    if ($text !== '') {
                        $textParts[] = $text;
                    }
                }

                // UL -> Links extrahieren
                if ($node->nodeName === 'ul') {
                    foreach ($node->getElementsByTagName('a') as $a) {
                        $label = trim($a->textContent);
                        $href = $a->getAttribute('href');

                        if ($label && $href) {
                            $links[] = [
                                'label' => $label,
                                'url' => $href,
                            ];
                        }
                    }
                }

                // Images bewusst ignorieren
                $node = $node->nextSibling;
            }

            if ($headline && ($textParts || $links)) {
                $sections[] = [
                    'headline' => $headline,
                    'text' => implode("\n\n", $textParts),
                    'links' => $links,
                ];
            }
        });

        return $sections;
    }

    /**
     * @throws ValidationException
     */
    private function getHtml($url): string
    {
        try {
            $response = $this->httpClient->request('GET', $url);
            return $response->getContent();
        } catch (\Throwable $e) {
            throw new ValidationException($e->getMessage());
        }
    }
}
