<?php

namespace App\Event;

use App\Entity\Request;
use Symfony\Contracts\EventDispatcher\Event;

class WithdrawRequestEvent extends Event
{
    public const NAME = "withdraw.request";

    public function __construct(
        private Request $request
    ){}

    public function getRequest():Request
    {
        return $this->request;
    }
}