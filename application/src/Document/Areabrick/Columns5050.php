<?php

declare(strict_types=1);

namespace App\Document\Areabrick;

use Pimcore\Extension\Document\Areabrick\AbstractTemplateAreabrick;

class Columns5050 extends AbstractTemplateAreabrick
{
    public function getName(): string
    {
        return 'Columns 50/50';
    }

    public function getDescription(): string
    {
        return 'A simple 50/50 column layout';
    }

    public function needsReload(): bool
    {
        // optional
        // here you can decide whether adding this bricks should trigger a reload
        // in the editing interface, this could be necessary in some cases. default=false
        return false;
    }
}
