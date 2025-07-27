<?php

declare(strict_types=1);

namespace App\EventSubscriber;

use Carbon\Carbon;
use Pimcore\Event\DataObjectEvents;
use Pimcore\Event\Model\DataObjectEvent;
use Pimcore\Mail;
use Pimcore\Model\DataObject;

class CommentEventSubscriber extends AbstractEventSubscriber
{
    /** @codeCoverageIgnore  */
    public static function getSubscribedEvents(): array
    {
        return [
            DataObjectEvents::PRE_UPDATE => [
                ['sendCommentPublishedMail'],
            ],
        ];
    }

    public function sendCommentPublishedMail(DataObjectEvent $event): void
    {
        $object = $event->getObject();

        if (!$object instanceof DataObject\Comment) {
            return;
        }

        if ($object->isPublished() === true && $object->getReleasedOn() === null) {

            $mail = new Mail();
            $mail->subject('Den Kommentar wurde veröffentlicht');
            $mail->text(trim(sprintf(
                    "
                    Hallo %s!\n\n
                    Dein Kommentar wurde veröffentlicht. Vielen Dank für Deinen Beitrag!\n
                    Hier der Link zum Blogpost: %s\n\n
                    Du erhältst diese E-Mail, weil du einen Kommentar auf unserem Blog hinterlassen hast und dieser jetzt freigeschaltet wurde.\n\n
                    Viele Grüße\n\n
                    Jochen vom Freiweg Blog\n\n
                    ––––––––––––––––––––––––––––––––––––––––––
                    Jochen Califice\n
                    Freiweg Blog – https://freiweg.blog\n
                    kontakt@freiweg.blog\n
                    Impressum: https://freiweg.blog/impressum\n
                    Datenschutz: https://freiweg.blog/datenschutz\n
                    ",
                    $object->getName(),
                    'xxx'
                )));

            $mail->addTo($object->getEmail());

            $mail->send();

            $object->setReleasedOn(Carbon::now());
        }
    }
}
