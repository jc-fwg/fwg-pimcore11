<?php

declare(strict_types=1);

namespace App\Command;

use Exception;
use Pimcore\Console\AbstractCommand as PimcoreAbstractCommand;
use Pimcore\Model\Tool\SettingsStore;
use Symfony\Component\Process\Exception\RuntimeException;

abstract class AbstractCommand extends PimcoreAbstractCommand
{
    public function __construct(
        ?string $name = null,
    ) {
        parent::__construct($name);
    }

    /**
     * @throws \RuntimeException
     */
    public function checkExecuted(): void
    {
        $executed = SettingsStore::get(static::class);

        if ($executed instanceof SettingsStore) {
            throw new RuntimeException('Command already marked as executed in settings store');
        }
    }

    /**
     * @codeCoverageIgnore
     *
     * @throws Exception
     */
    public function markExecuted(): void
    {
        SettingsStore::set(static::class, true);
    }
}
