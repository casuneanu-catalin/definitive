<?php

namespace App\EventListener;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;

class UserStatusChangedNotifier
{
    public function __construct(private EntityManagerInterface $em, private MailerInterface $mailer){}

    public function preUpdate(User $user, LifecycleEventArgs $event):void
    {
        $status = $user->getStatus();

        $uow = $this->em->getUnitOfWork();
        $uow->computeChangeSets();

        $changeset = $uow->getEntityChangeSet($user);

        if(!array_key_exists('status', $changeset)) {
            return;
        }

        if($status == 'approved') {
            $email = (new TemplatedEmail())
            ->from("noreply@quantic-technologies.net")
            ->to($user->getEmail())
            ->subject("Your Quantic Technologies Account")
            ->htmlTemplate('emails/approved.html.twig')
            ->context([
                'name' => $user->getFirstName()
            ]);
            
            $this->mailer->send($email);
            return;
        }
        
        if($status == 'failed') {
            $email = (new TemplatedEmail())
            ->from("noreply@quantic-technologies.net")
            ->to($user->getEmail())
            ->subject("Your Quantic Technologies Account")
            ->htmlTemplate('emails/rejected.html.twig')
            ->context([
                "name" => $user->getFirstName()
            ]);
            
            $this->mailer->send($email);
            return;
        }
    }
}