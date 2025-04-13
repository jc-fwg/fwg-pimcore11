<?php

declare(strict_types=1);

namespace App\Controller;

use App\Adapter\App\Database\Doctrine\Repository\MaterialListRepository;
use App\Dto\RentalObjectDetailsDto;
use App\Service\CaptchaService;
use App\Service\RentalService;
use App\Tool\SiteConfigTool;
use Pimcore\Bundle\ApplicationLoggerBundle\ApplicationLogger;
use Pimcore\Mail;
use Pimcore\Model\Asset;
use Pimcore\Model\DataObject\RentalObject;
use Pimcore\Model\Document;
use Psr\Log\LogLevel;
use Symfony\Bridge\Twig\Attribute\Template;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Mime\Address;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Contracts\Translation\TranslatorInterface;

class RentalController extends BaseController
{
    public function __construct(
        private readonly RentalService $rentalService
    )
    {
    }

    /**
     * @return array{
     *     document: ?Document,
     *     rentalObjects: RentalObjectDetailsDto[]
     */
    #[Template('content/rental/list.html.twig')]
    #[Route('/vermietung', name: 'rental_list', options: ['sitemap' => true, 'section' => 'material'])]
    public function listAction(
        Request $request,
        FormFactoryInterface $formFactory,
        TranslatorInterface $translator,
        CaptchaService $captchaService
    ): array
    {
        $builder = $formFactory->createBuilder();

        $captcha = $captchaService->getCaptcha();


        $form = $builder
            ->add('result', TextType::class,
                [
                    'label' => false,
                    'constraints' => [
                        new NotBlank(),
                    ],
                ])
            ->add('email', TextType::class,
                [
                    'required' => true,
                    'label' => false,
                    'attr' => [
                        'placeholder' => $translator->trans('rental.list.form.email.placeholder'),
                    ],
                    'constraints' => [
                        new NotBlank(),
                        new Email(),
                    ],
                ])
            ->add('submit', SubmitType::class,
                [
                    'label' => $translator->trans('rental.list.form.button.value'),
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

            $data = $form->getData();

            $captcha = $captchaService->getCaptcha($data['cake']);

            $captchaInvalid = false;

            if (
                $captcha === null
                || (int) $captcha['result'] !== (int) $data['result']
            ) {
                $captchaInvalid = true;
            }

            $captchaService->removeCaptcha($data['cake']);

            $mailsBlacklisted = SiteConfigTool::getEmailsSeperatedFromString(SiteConfigTool::getSiteConfig()->getMaterialListEmailBlacklist());

            $isBlacklisted = in_array($data['email'], $mailsBlacklisted);

            // Send email if not blacklisted and captcha is valid
            if ($captchaInvalid === false && $isBlacklisted === false) {

                $siteConfig = SiteConfigTool::getSiteConfig();

                $recipient = new Address($data['email']);

                $mail = new Mail();
                $mail->addTo($recipient);

                $bccAddresses = SiteConfigTool::getEmailsSeperatedFromString($siteConfig->getMaterialListEmailBcc());

                foreach ($bccAddresses as $bccAddress) {
                    $mail->addBcc(new Address($bccAddress));
                }

                $mail->text((string)$siteConfig->getMaterialListText());
                $mail->subject((string)$siteConfig->getMaterialListSubject());

                $asset = $siteConfig->getMaterialListAsset();
                if ($asset instanceof Asset) {
                    $mail->attach($asset->getData(), $asset->getFilename(), $asset->getMimeType());
                }

                $mail->send();
            }

            match (true) {
                $captchaInvalid === true =>
                    ApplicationLogger::getInstance()->log(LogLevel::ALERT, sprintf('Materialliste: Captcha invalid: %s', $data['email'])),
                $isBlacklisted === true =>
                    ApplicationLogger::getInstance()->log(LogLevel::ALERT, sprintf('Materialliste: E-Mail auf Blacklist: %s', $data['email'])),
                default =>
                    ApplicationLogger::getInstance()->log(LogLevel::INFO, sprintf('Materialliste vesendet: %s', $data['email']))
            };
        }

        return [
            'document' => Document::getByPath('/vermietung'),
            'rentalObjects' => $this->rentalService->getRentalObjects(),
            'form' => $form->createView(),
            'captcha' => $captcha,
            'mailSent' => $form->isSubmitted() && $form->isValid(),
        ];
    }

    #[Route(
        '/vermietung/{slug}',
        name: 'rental_details_redaxo',
        requirements: ['slug' => '.+eqid\d+.html'],
        priority: 10
    )]
    public function redaxoDetailsAction(string $slug): RedirectResponse
    {
        $eqid = preg_match('/eqid(\d+)/', $slug, $matches) ? $matches[1] : null;

        $rentalObject = RentalObject::getByRedaxoArticleSliceId($eqid, 1);

        if ($rentalObject instanceof RentalObject) {
            return $this->redirect('/vermietung/' . $rentalObject->getSlug(), Response::HTTP_MOVED_PERMANENTLY);
        }
    }

    /**
     * @return array{
     *     rentalObject: RentalObjectDetailsDto
     * }
     */
    #[Template('content/rental/details.html.twig')]
    #[Route(
        '/vermietung/{slug}',
        name: 'rental_details',
    )]
    public function detailsAction(string $slug): array
    {
        $rentalObject = RentalObject::getBySlug($slug, 1);

        if (!$rentalObject instanceof RentalObject) {
            throw new NotFoundHttpException('RentalObject not found');
        }

        return [
            'rentalObject' => $this->rentalService->getRentalObjectDetails($rentalObject),
        ];
    }
}
