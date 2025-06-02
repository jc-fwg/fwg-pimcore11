<?php

declare(strict_types=1);

namespace App\Service;

use App\Dto\ActivityDto;
use Pimcore\Model\DataObject;
use Symfony\Component\String\Slugger\SluggerInterface;

class BlogpostService
{
    public const string BADGES_REGIONS   = 'regions';
    public const string BADGES_STATES    = 'states';
    public const string BADGES_COUNTRIES = 'countries';

    public function __construct(
        private readonly SluggerInterface $slugger,
    ) {
    }

    public function setSlug(DataObject\Blogpost $blogpost): void
    {
        $slug   = [];
        $slug[] = $blogpost->getHeadline();

        $blogpost->setSlug($this->slugger->slug(implode(' ', $slug))->toString());
    }

    /** @return string[] */
    public function getBadges(ActivityDto $dto): array
    {
        $badges = [];

        foreach ($dto->regions as $region) {
            $badges[self::BADGES_REGIONS][] = $region->name;

            foreach ($region->states as $state) {
                $badges[self::BADGES_STATES][] = $state->name;

                if ($state->country !== null) {
                    $badges[self::BADGES_COUNTRIES][] = $state->country->name;
                }
            }
        }

        return array_unique(array_merge(
            $badges[self::BADGES_REGIONS] ?? [],
            $badges[self::BADGES_STATES] ?? [],
            $badges[self::BADGES_COUNTRIES] ?? [],
        ));
    }
}
