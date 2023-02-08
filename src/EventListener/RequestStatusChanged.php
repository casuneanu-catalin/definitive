<?php

namespace App\EventListener;

use App\Entity\Request;
use App\Event\CompletedRequestEvent;
use App\Event\DepositRequestEvent;
use App\Event\RequestSubscriber;
use App\Event\WithdrawRequestEvent;
use Doctrine\ORM\EntityManagerInterface;

use Symfony\Component\EventDispatcher\EventDispatcher;

class RequestStatusChanged
{
    public function __construct(
        private EntityManagerInterface $em,
        private RequestSubscriber $requestSubscriber
    ){}

    public function prePersist(): void
    {
        $uow = $this->em->getUnitOfWork();

        foreach ($uow->getScheduledEntityUpdates() as $entity) {
            // only request entitites
            if (!($entity instanceof Request)) return;

            $uow->computeChangeSets();
            $changeSet = $uow->getEntityChangeSet($entity);
            if (!array_key_exists('status', $changeSet)) {
                return;
            }

            $status = $entity->getStatus();
            $type = $entity->getType();

            // only accepted statuses
            if (!in_array($status, array('approved', 'completed'))) return;
            
            $dispatcher = new EventDispatcher();

            if($status === 'completed') {
                $event = new CompletedRequestEvent($entity);
                $dispatcher->addSubscriber($this->requestSubscriber);
                $dispatcher->dispatch($event, CompletedRequestEvent::NAME);
                return;
            }

            if($type === 'withdraw') {
                $event = new WithdrawRequestEvent($entity);
                $dispatcher->addSubscriber($this->requestSubscriber);
                $dispatcher->dispatch($event, WithdrawRequestEvent::NAME);
                return;
            }
            
            if ($type === 'deposit'){
                $event = new DepositRequestEvent($entity);
                $dispatcher->addSubscriber($this->requestSubscriber);
                $dispatcher->dispatch($event, DepositRequestEvent::NAME);
                $this->em->persist($entity);
                $this->em->flush();
                $uow->computeChangeSet($this->em->getClassMetadata(get_class($entity)), $entity);
                return;
            }

        }
    }
}
