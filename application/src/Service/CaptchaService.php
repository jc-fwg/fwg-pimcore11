<?php

declare(strict_types=1);

namespace App\Service;

use Pimcore\Cache;
use Random\RandomException;

class CaptchaService
{
    public const string CAPTCHA_CACHE_KEY = 'cacheKey';

    private const array CAPTCHA_ARITHMETICS = [
        'addition',
        'subtraction',
        'multiplication',
        'division',
    ];

    /**
     * @throws RandomException
     */
    public function getCaptcha(?string $cacheKey = null): ?array
    {
        if ($cacheKey !== null) {
            return $this->getCaptchaByCacheKey($cacheKey);
        }

        $arithmetic = self::CAPTCHA_ARITHMETICS[array_rand(self::CAPTCHA_ARITHMETICS)];

        $captcha = match ($arithmetic) {
            'addition' => $this->createAddition(),
            'subtraction' => $this->createSubtraction(),
            'multiplication' => $this->createMultiplication(),
            'division' => $this->createDivision(),
        };

        $captcha['operand'] = match($arithmetic) {
            'addition' => 'plus',
            'subtraction' => 'minus',
            'multiplication' => 'mal',
            'division' => 'geteilt durch',
        };

        $cacheKey = sprintf('captcha_%s_%s', $arithmetic, time());

        Cache::setForceImmediateWrite(true);
        Cache::save($captcha, $cacheKey);

        $captcha[self::CAPTCHA_CACHE_KEY] = $cacheKey;

        return $captcha;
    }

    public function removeCaptcha(string $cacheKey): void
    {
        Cache::setForceImmediateWrite(true);
        Cache::remove($cacheKey);
    }

    public function getCaptchaByCacheKey(string $cacheKey): ?array
    {
        $captcha = Cache::load($cacheKey);

        if (is_array($captcha) === false) {
            return null;
        }

        return $captcha;
    }

    /**
     * @return int[]
     * @throws RandomException
     */
    private function createAddition(): array
    {
        $firstNumber = random_int(1, 50);
        $secondNumber = random_int(1, 50);

        return [
            'firstNumber' => $firstNumber,
            'secondNumber' => $secondNumber,
            'result' => $firstNumber + $secondNumber,
        ];
    }

    /**
     * @return int[]
     * @throws RandomException
     */
    private function createSubtraction(): array
    {
        $firstNumber = random_int(10, 100);
        $secondNumber = random_int(1, ($firstNumber - 1));

        return [
            'firstNumber' => $firstNumber,
            'secondNumber' => $secondNumber,
            'result' => $firstNumber - $secondNumber,
        ];
    }

    /**
     * @return int[]
     * @throws RandomException
     */
    private function createMultiplication(): array
    {
        $firstNumber = random_int(1, 10);
        $secondNumber = random_int(1, 10);

        return [
            'firstNumber' => $firstNumber,
            'secondNumber' => $secondNumber,
            'result' => $firstNumber * $secondNumber,
        ];
    }

    /**
     * @return int[]
     * @throws RandomException
     */
    private function createDivision(): array
    {
        $firstNumber = null;
        $secondNumber = null;
        $result = null;

        while (is_int($result) === false) {
            $firstNumber = random_int(1, 100);
            $secondNumber = random_int(1, 100);

            $result = $firstNumber / $secondNumber;
        }

        return [
            'firstNumber' => $firstNumber,
            'secondNumber' => $secondNumber,
            'result' => $firstNumber / $secondNumber,
        ];
    }
}
