<?php

declare(strict_types=1);

namespace App\Dto;

use Pimcore\Model\Element\AbstractElement;

class DataModelDto
{
    public ?bool $isPublished = null;
    public ?string $key = null;
    public ?string $path = null;
    public ?Carbon $creationDate = null;
    public ?Carbon $modificationDate = null;
    public ?int $parentId = null;
    public ?AbstractElement $parent = null;
}
