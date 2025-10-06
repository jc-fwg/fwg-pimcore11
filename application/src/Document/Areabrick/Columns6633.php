<?php

declare(strict_types=1);

namespace App\Document\Areabrick;

use Pimcore\Extension\Document\Areabrick\AbstractTemplateAreabrick;

class Columns6633 extends AbstractTemplateAreabrick
{
    public function getName(): string
    {
        return 'Columns 66/33';
    }

    public function getDescription(): string
    {
        return 'A simple 66/33 column layout';
    }

    public function needsReload(): bool
    {
        // optional
        // here you can decide whether adding this bricks should trigger a reload
        // in the editing interface, this could be necessary in some cases. default=false
        return false;
    }
}
