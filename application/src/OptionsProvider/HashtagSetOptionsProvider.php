<?php

declare(strict_types=1);

namespace App\OptionsProvider;

use App\Adapter\App\Database\Doctrine\Repository\HashtagSetRepository;
use Exception;
use Pimcore\Model\DataObject\ClassDefinition\Data;

class HashtagSetOptionsProvider extends AbstractSelectOptionsProvider
{
    public function __construct(
        private readonly HashtagSetRepository $repository,
    ) {
    }

    /**
     * @param array<array-key, mixed> $context
     *
     * @return array<int, array<string, int|string>>
     */
    public function getOptions(array $context, Data $fieldDefinition): array
    {
        try {
            return $this->repository->findAllAsSelectOptions();
        } catch (Exception $e) {
            return [];
        }
    }
}
