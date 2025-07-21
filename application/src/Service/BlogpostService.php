<?php

declare(strict_types=1);

namespace App\Service;

use App\Exception\Captcha\InvalidCaptchaException;
use App\ValueObject\BlogpostCommentValueObject;
use Pimcore\Bundle\ApplicationLoggerBundle\ApplicationLogger;
use Pimcore\Model\DataObject;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\Form\FormInterface;
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
            ->add('pid', HiddenType::class)
            ->getForm();

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            try {
                $this->handleCommentForm($form);
            } catch (InvalidCaptchaException $exception) {
                ApplicationLogger::getInstance()->alert($exception->getMessage());
            } catch (\Throwable $exception) {
                ApplicationLogger::getInstance()->error($exception->getMessage());
            }
        }

        return new BlogpostCommentValueObject(
            formView: $form->createView(),
            captcha: $captcha,
            isHandled: $form->isSubmitted() && $form->isValid()
        );;
    }

    private function handleCommentForm(FormInterface $form): void
    {
        $data = $form->getData();

        $captcha = $this->captchaService->getCaptcha($data['cake']);
        $captchaResultFromCache = $captcha['result'] ?? null;

        $this->captchaService->removeCaptcha($data['cake']);

        if (
            $captcha === null
            || (int) $captchaResultFromCache !== (int) $data['result']
        ) {
            throw new InvalidCaptchaException(
                sprintf(
                    'Invalid comment captcha for parentId %s (eMail: %s)',
                    $data['pid'],
                    $data['email']
                )
            );
        }


        // Save the comment to the database or perform other actions
    }
}
