<?php

declare(strict_types=1);

namespace App\Document\Areabrick;

use Pimcore\Extension\Document\Areabrick\AbstractTemplateAreabrick;

class Columns100 extends AbstractTemplateAreabrick
{
    public function getName(): string
    {
        return 'Column 100';
    }

    public function getDescription(): string
    {
        return 'A simple one column layout';
    }

    public function needsReload(): bool
    {
        // optional
        // here you can decide whether adding this bricks should trigger a reload
        // in the editing interface, this could be necessary in some cases. default=false
        return false;
    }
}
