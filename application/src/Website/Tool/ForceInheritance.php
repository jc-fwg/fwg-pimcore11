<?php

declare(strict_types=1);

/**
 * Pimcore.
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Enterprise License (PEL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 *  @license    http://www.pimcore.org/license     GPLv3 and PEL
 */

namespace App\Website\Tool;

use Pimcore\Model\DataObject\AbstractObject;

class ForceInheritance
{
    public static function run($callable)
    {
        $inheritanceBackup = AbstractObject::getGetInheritedValues();
        AbstractObject::setGetInheritedValues(true);
        $result = $callable();
        AbstractObject::setGetInheritedValues($inheritanceBackup);

        return $result;
    }
}
