<?php

namespace App\Event;

use App\Repository\BalanceRepository;
use App\Repository\RequestRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class RequestSubscriber implements EventSubscriberInterface
{
    public function __construct(
        private RequestRepository $requestRepository,
        private BalanceRepository $balanceRepository
    ){}

    public static function getSubscribedEvents()
    {
        return [
            WithdrawRequestEvent::NAME => 'onWithdrawRequest',
            DepositRequestEvent::NAME => 'onDepositRequest',
            CompletedRequestEvent::NAME => 'onCompletedRequest'
        ];
    }

    public function onWithdrawRequest(WithdrawRequestEvent $event)
    {
        $request = $event->getRequest();
        $this->requestRepository->createEndDate($request);
        $this->balanceRepository->withdraw($request->getUser()->getBalance(), $request->getAmount());
        $event->stopPropagation();
    }

    public function onDepositRequest(DepositRequestEvent $event)
    {
        $request = $event->getRequest();
        $this->requestRepository->createEndDate($request);
        $this->balanceRepository->deposit($request->getUser()->getBalance(), $request->getAmount());
        $event->stopPropagation();
    }

    public function onCompletedRequest(CompletedRequestEvent $event)
    {
        $request = $event->getRequest();
        $this->balanceRepository->handleStakingComplete($request->getUser()->getBalance(), $request->getAmount());
        $event->stopPropagation();
    }
}