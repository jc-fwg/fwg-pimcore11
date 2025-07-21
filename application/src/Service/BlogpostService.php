<?php

declare(strict_types=1);

namespace App\Service;

use App\ValueObject\BlogpostCommentValueObject;
use Pimcore\Model\DataObject;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Contracts\Translation\TranslatorInterface;

class BlogpostService
{
    public function __construct(
        private readonly SluggerInterface $slugger,
        private readonly FormFactoryInterface $formFactory,
        private readonly CaptchaService $captchaService,
        private readonly TranslatorInterface $translator
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
            ->add('result', TextType::class, [
                'constraints' => [
                    new NotBlank(),
                ],
            ])
            ->add('name', TextType::class,
                [
                    'required' => true,
                    'label' => false,
                    'attr' => [
                        'placeholder' => $this->translator->trans('blogpost.comments.form.name.placeholder'),
                    ],
                    'constraints' => [
                        new NotBlank(),
                    ],
                ])
            ->add('email', TextType::class,
                [
                    'required' => true,
                    'label' => false,
                    'attr' => [
                        'placeholder' => $this->translator->trans('blogpost.comments.form.email.placeholder'),
                    ],
                    'constraints' => [
                        new NotBlank(),
                        new Email(),
                    ],
                ])
            ->add('website', TextType::class,
                [
                    'required' => false,
                    'label' => false,
                    'attr' => [
                        'placeholder' => $this->translator->trans('blogpost.comments.form.website.placeholder'),
                    ],
                ])
            ->add('comment', TextType::class,
                [
                    'required' => true,
                    'label' => false,
                    'attr' => [
                        'placeholder' => $this->translator->trans('blogpost.comments.form.comment.placeholder'),
                    ],
                    'constraints' => [
                        new NotBlank(),
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
            ->getForm();

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // TBD
        }

        return new BlogpostCommentValueObject(
            formView: $form->createView(),
            captcha: $captcha,
            isHandled: $form->isSubmitted() && $form->isValid()
        );;
    }
}
