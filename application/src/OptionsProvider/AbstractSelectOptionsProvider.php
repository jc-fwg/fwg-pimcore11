<?php

declare(strict_types=1);

namespace App\OptionsProvider;

use Pimcore\Model\DataObject\ClassDefinition\Data;
use Pimcore\Model\DataObject\ClassDefinition\DynamicOptionsProvider\SelectOptionsProviderInterface;

/** @codeCoverageIgnore  */
abstract class AbstractSelectOptionsProvider implements SelectOptionsProviderInterface
{
    /**
     * @var array<int, array<string, int|string>>|null
     */
    protected ?array $options = null;

    /**
     * @param array<array-key, mixed> $context
     *
     * @return array<int, array<string, int|string>>
     */
    abstract public function getOptions(array $context, Data $fieldDefinition): array;

    /**
     * @param array<array-key, mixed> $context
     *
     * @codeCoverageIgnore Has static return value, therefore it does not need to be tested
     */
    public function hasStaticOptions($context, Data $fieldDefinition): bool
    {
        return true;
    }

    /**
     * @param array<array-key, mixed> $context
     *
     * @codeCoverageIgnore Has static return value, therefore it does not need to be tested
     */
    public function getDefaultValue($context, Data $fieldDefinition): ?string
    {
        return null;
    }
}
