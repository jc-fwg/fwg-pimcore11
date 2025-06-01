<?php

declare(strict_types=1);

namespace App\Tests\Unit;

use Codeception\Test\Unit;

/**
 * This is a tongue-in-cheek test created to validate codeception functionality.
 *
 * @internal
 *
 * @coversNothing
 */
final class ReadmeTest extends Unit
{
    private const README_PATH = PROJECT_ROOT.'/README.md';
    private string $readme;

    protected function setUp(): void
    {
        parent::setUp();
        $this->readme = file_get_contents(self::README_PATH);
    }

    public function testReadmeIsWrittenWithLove(): void
    {
        static::assertStringContainsString('😎', $this->readme);
        static::assertStringContainsString('pimcore', $this->readme);
    }

    public function testReadmeContainsInstructionsForExecutingTests(): void
    {
        static::assertStringContainsString('codecept run', $this->readme);
    }
}
