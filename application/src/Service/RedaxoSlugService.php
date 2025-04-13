<?php

declare(strict_types=1);

namespace App\Service;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class RedaxoSlugService
{
    private const string ARTWORLDMEDIA_HOST = 'https://www.artworldmedia.com';
    private const string URL_PARTS_SEPARATOR = '-';

    private array $urlParts = [];

    public function __construct(
        private readonly HttpClientInterface $client,
    )
    {
    }

    public function addSlugPart(string $part, ?string $separator = '-')
    {
        $addPart = $this->cleanUpSlugPart($part);

        if ($separator !== null) {
            $addPart = sprintf(
                '%s%s',
                $separator,
                $addPart,
            );
        }

        $this->urlParts[] = $addPart;
    }

    public function buildSlug(): string
    {
        $slug = sprintf(
            '%s%s',
            implode('', $this->urlParts),
            '.html',
        );

        $this->urlParts = [];

        $url = sprintf(
            '%s/%s',
            self::ARTWORLDMEDIA_HOST,
            $slug,
        );

        if ($this->pageExists($url) === false) {
            throw new \RuntimeException(sprintf('Page %s does not exist', $url));
        }

        return $slug;
    }

    private function cleanUpSlugPart(string $urlPart): string
    {
        $search = [
            'ä',
            'ö',
            'ü',
            'ß',
            ' ',
            'á',
            'à',
            'â',
            'é',
            'è',
            'ê',
            'ì',
            'í',
            'î',
            'ó',
            'ò',
            'ô',
            'ú',
            'ù',
            'û',
            '+',
            '&',
        ];

        $replace = [
            'ae',
            'oe',
            'ue',
            'ss',
            ' ',
            'a',
            'a',
            'a',
            'e',
            'e',
            'e',
            'i',
            'i',
            'i',
            'o',
            'o',
            'o',
            'u',
            'u',
            'u',
            '-und-',
            '-und-',
        ];

        $partCleaned = str_replace($search, $replace, $urlPart);
        $partCleaned = strtolower(preg_replace('/[^a-zA-Z0-9]+/', self::URL_PARTS_SEPARATOR, $partCleaned));

        return $partCleaned;
    }

    /**
     * @throws TransportExceptionInterface
     */
    private function pageExists(string $url): bool
    {
        $response = $this->client->request(Request::METHOD_GET, $url);

        return $response->getStatusCode() === Response::HTTP_OK;
    }
}
