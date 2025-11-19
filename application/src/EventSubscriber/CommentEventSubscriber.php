<?php

declare(strict_types=1);

namespace App\EventSubscriber;

use Carbon\Carbon;
use Pimcore\Event\DataObjectEvents;
use Pimcore\Event\Model\DataObjectEvent;
use Pimcore\Mail;
use Pimcore\Model\DataObject;
use Pimcore\Model\Element\ValidationException;

use Symfony\Component\HttpFoundation\RequestStack;
use function sprintf;

class CommentEventSubscriber extends AbstractEventSubscriber
{
    public function __construct(private readonly RequestStack $requestStack)
    {
    }

    /** @codeCoverageIgnore  */
    public static function getSubscribedEvents(): array
    {
        return [
            DataObjectEvents::PRE_UPDATE => [
                ['sendCommentPublishedMail'],
            ],
        ];
    }

    /**
     * @throws ValidationException
     */
    public function sendCommentPublishedMail(DataObjectEvent $event): void
    {
        $object = $event->getObject();

        if ($this->isAutoSave($event) === true) {
            return;
        }

        if (!$object instanceof DataObject\Comment) {
            return;
        }

        if ($object->isPublished() && empty($object->getReleaseStatus()) === true) {
            $object->setPublished(false);
            throw new ValidationException('Release Status must be set if comment is published');
        }

        if (
            $object->getReleaseStatus() === 'released'
            && $object->isPublished()
            && empty($object->getReleaseStatusSetOn()) === true
        ) {
            $blogpost = $object;
            while (!$blogpost instanceof DataObject\Blogpost) {
                $blogpost = $blogpost->getParent();

                if ($blogpost->getId() === 1) {
                    break;
                }
            }

            $schemaAndHost = $this->requestStack->getMainRequest()->getSchemeAndHttpHost();

            $blogpostTitle = '';
            $blogpostLink = '';
            if ($blogpost instanceof DataObject\Blogpost) {
                $blogpostTitle = $blogpost->getTitle();
                $blogpostLink = $schemaAndHost . '/' . $blogpost->getSlug();
            }

            $mail = new Mail();
            $mail->subject('Dein Kommentar wurde veröffentlicht');
            $mail->text(trim(sprintf(
                "
                    Hallo %s!\n\n
                    Dein Kommentar zum Blogpost \"%s\"wurde veröffentlicht. Vielen Dank für Deinen Beitrag!\n\n‚
                    Hier der Link zum Blogpost: %s\n\n
                    Du erhältst diese E-Mail, weil du einen Kommentar auf unserem Blog hinterlassen hast und dieser jetzt freigeschaltet wurde.\n\n
                    Viele Grüße\n\n
                    Jochen vom FreiWeg Blog\n\n
                    ––––––––––––––––––––––––––––––––––––––––––
                    Jochen Califice\n
                    FreiwWeg Outdoor Activity Blog – {$schemaAndHost}\n
                    freiweg@outlook.de\n
                    Impressum & Datenschutz: {$schemaAndHost}/impressum-und-datenschutz\n
                    ",
                $object->getName(),
                $blogpostTitle,
                $blogpostLink
            )));

            $mail->addTo($object->getEmail());

            $mail->send();
        }

        $object->setReleaseStatusSetOn(Carbon::now());
    }
}
