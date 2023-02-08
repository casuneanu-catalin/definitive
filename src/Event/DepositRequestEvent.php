<?php

namespace App\Event;

use App\Entity\Request;
use Symfony\Contracts\EventDispatcher\Event;

class DepositRequestEvent extends Event
{
    public const NAME = "deposit.request";

    public function __construct(
        private Request $request
    ){}

    public function getRequest():Request
    {
        return $this->request;
    }
}