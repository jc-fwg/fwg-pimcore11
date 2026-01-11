<?php

declare(strict_types=1);

namespace App\Validator;

use App\Adapter\App\Database\Doctrine\Repository\BlogpostRepository;
use App\Dto\BlogpostDto;
use App\Service\BlogpostService;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Throwable;

use function in_array;
use function sprintf;

class BlogpostExternalUrlsAreValidValidator extends ConstraintValidator
{
    public function __construct(
        private readonly BlogpostService $blogpostService,
        private readonly BlogpostRepository $blogpostRepository,
    ) {
    }

    public function validate($value, Constraint $constraint): void
    {
        if (in_array($_ENV['APP_ENV'], ['dev', 'test'], true)) {
            return;
        }

        if (!$constraint instanceof BlogpostExternalUrlsAreValid) {
            throw new UnexpectedTypeException($constraint, BlogpostExternalUrlsAreValid::class);
        }

        if (!$value instanceof BlogpostDto) {
            throw new UnexpectedTypeException($value, BlogpostDto::class);
        }

        try {
            $blogpost = $this->blogpostRepository->findById((string) $value->id);
        } catch (Throwable $exception) {
            return;
        }

        $externalLinks = $this->blogpostService->getExternalLinksStatus($blogpost);

        foreach ($externalLinks as $statusCode => $links) {
            if ($statusCode === Response::HTTP_OK) {
                continue;
            }

            foreach ($links as $link) {
                $this->context
                    ->buildViolation(
                        sprintf(
                            $constraint->message,
                            $statusCode,
                            $link['text'],
                            $link['url']
                        )
                    )
                    ->atPath('Content')
                    ->addViolation();
            }
        }
    }
}
