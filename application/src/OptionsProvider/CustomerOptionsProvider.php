<?php

declare(strict_types=1);

namespace App\OptionsProvider;

use Pimcore\Model\DataObject\ClassDefinition\Data;
use Pimcore\Model\DataObject\ClassDefinition\DynamicOptionsProvider\SelectOptionsProviderInterface;
use Pimcore\Model\DataObject\Customer\Listing;

class CustomerOptionsProvider implements SelectOptionsProviderInterface
{
    public function getOptions(array $context, Data $fieldDefinition): array
    {
        $listing = new Listing();
        $listing->setOrderKey('name');
        $listing->setOrder('asc');

        $items = [];

        foreach ($listing->load() as $item) {
            $items[] = [
                'key' => $item->getName() ?? $item->getKey(),
                'value' => $item->getId(),
            ];
        }

        array_multisort(array_column($items, 'key'), SORT_ASC, $items);

        return $items;
    }

    public function hasStaticOptions(array $context, Data $fieldDefinition): bool
    {
        return true;
    }

    /**
     * @return string|array<string|array{value: string}>|null
     */
    public function getDefaultValue(array $context, Data $fieldDefinition): string|array|null
    {
        return $fieldDefinition->getDefaultValue();
    }
}
