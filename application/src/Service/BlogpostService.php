<?php

declare(strict_types=1);

namespace App\Service;

use App\Dto\CommentDto;
use App\ValueObject\BlogpostCommentValueObject;
use Carbon\Carbon;
use Pimcore\Bundle\ApplicationLoggerBundle\ApplicationLogger;
use Pimcore\Model\DataObject;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\Validator\ConstraintViolation;
use Symfony\Component\Validator\ConstraintViolationListInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

class BlogpostService
{
    public function __construct(
        private readonly SluggerInterface $slugger,
        private readonly FormFactoryInterface $formFactory,
        private readonly CaptchaService $captchaService,
        private readonly TranslatorInterface $translator,
        private readonly ValidatorInterface $validator,
    ) {
    }

    public function setSlug(DataObject\Blogpost $blogpost): void
    {
        $slug   = [];
        $slug[] = $blogpost->getHeadline();

        $blogpost->setSlug($this->slugger->slug(implode(' ', $slug))->toString());
    }

    public function createOrHandleCommentForm(Request $request): BlogpostCommentValueObject
    {
        $builder = $this->formFactory->createBuilder();

        $captcha = $this->captchaService->getCaptcha();

        $form = $builder
            ->add('result', TextType::class,
                [
                    'label' => false,
                    'attr' => [
                        'placeholder' => $this->translator->trans('blogpost.comments.form.result.placeholder'),
                    ],
                ])
            ->add('name', TextType::class,
                [
                    'label' => false,
                    'attr' => [
                        'placeholder' => $this->translator->trans('blogpost.comments.form.name.placeholder'),
                    ],
                ])
            ->add('email', TextType::class,
                [
                    'label' => false,
                    'attr' => [
                        'placeholder' => $this->translator->trans('blogpost.comments.form.email.placeholder'),
                    ],
                ])
            ->add('website', TextType::class,
                [
                    'label' => false,
                    'attr' => [
                        'placeholder' => $this->translator->trans('blogpost.comments.form.website.placeholder'),
                    ],
                ])
            ->add('comment', TextType::class,
                [
                    'label' => false,
                    'attr' => [
                        'placeholder' => $this->translator->trans('blogpost.comments.form.comment.placeholder'),
                    ],
                ])
            ->add('submit', SubmitType::class,
                [
                    'label' => $this->translator->trans('blogpost.comments.form.button.value'),
                    'attr' => [
                        'class' => 'js-recaptcha',
                    ],
                ])
            ->add('cake', HiddenType::class,
                [
                    'data' => $captcha['cacheKey'],
                ])
            ->add('pid', HiddenType::class)
            ->getForm();

        $form->handleRequest($request);
        $errors = null;

        if ($form->isSubmitted()) {
            $errors = $this->handleCommentForm($form);
        }

        return new BlogpostCommentValueObject(
            formView: $form->createView(),
            captcha: $captcha,
            isHandled: $form->isSubmitted() && $form->isValid(),
            errors: $errors
        );
    }

    private function handleCommentForm(FormInterface $form): ?ConstraintViolationListInterface
    {
        $data = $form->getData();

        $captcha = $this->captchaService->getCaptcha($data['cake']);
        $captchaResultFromCache = $captcha['result'] ?? null;

        $this->captchaService->removeCaptcha($data['cake']);

        $commentDto = new CommentDto(
            parentId: (int) $data['pid'],
            dateTime: Carbon::now(),
            id: null,
            name: $data['name'],
            email: $data['email'],
            comment: $data['comment'],
            website: $data['website'] ?? null,
        );

        // Validation
        $errors = $this->validator->validate($commentDto);

        if (
            $captcha === null
            || (int) $captchaResultFromCache !== (int) $data['result']
        ) {
            ApplicationLogger::getInstance()->alert(
                sprintf(
                    'Invalid comment captcha for parentId %s (eMail: %s)',
                    $data['pid'],
                    $data['email']
                )
            );
            $errors->add(new ConstraintViolation(
                'Invalid captcha result',
                null,
                [],
                null,
                'result',
                $data['result']
            ));;
        }

        if ($errors->count() > 0) {
            return $errors;
        }

        // Save the comment to the database or perform other actions
        return null;
    }
}
