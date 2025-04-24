<?php

declare(strict_types=1);

namespace App\OptionsProvider;

use App\Adapter\App\Database\Doctrine\Repository\AuthorRepository;
use Exception;
use Pimcore\Model\DataObject\ClassDefinition\Data;

class AuthorOptionsProvider extends AbstractSelectOptionsProvider
{
    public function __construct(
        private readonly AuthorRepository $repository,
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
