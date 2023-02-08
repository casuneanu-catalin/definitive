<?php

namespace App\Event;

use App\Entity\Request;
use Symfony\Contracts\EventDispatcher\Event;

class CompletedRequestEvent extends Event
{
    public const NAME = "completed.request";

    public function __construct(
        private Request $request
    ){}

    public function getRequest():Request
    {
        return $this->request;
    }
}