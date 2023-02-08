<?php

namespace App\EventListener;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;

class UserCreatedNotifier
{
    public function __construct(private UserRepository $userRepository,private MailerInterface $mailer){}

    public function prePersist(User $user, LifecycleEventArgs $event):void
    {
        $editors = $this->userRepository->getUsersByRole('ROLE_EDITOR');
        $admins = $this->userRepository->getUsersByRole('ROLE_ADMIN');
        $senders = array_merge($editors, $admins);

        /**
         * @var User $sender
         */
        foreach ($senders as $sender) {
            $email = (new TemplatedEmail())
            ->from("noreply@quantic-technologies.net")
            ->to($sender->getEmail())
            ->subject("New Quantic Technologies Account")
            ->htmlTemplate('emails/new_account.html.twig');
        
            $this->mailer->send($email);
        }
    }
}