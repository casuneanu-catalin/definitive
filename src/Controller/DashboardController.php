<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractController
{
    #[Route('/dashboard/{reactRouting}', name: 'dashboard', methods: 'GET', defaults: ['reactRouting' => null])]
    public function index(): Response
    {
        $request = new \stdClass();
        $request->icon = '/build/images/multiversx.55fc098a.png';
        $request->project = 'MultiversX';
        $request->coin = 'EGLD';
        $request->amount = 10;
        $request->apr = 0.1;
        $request->lockTime = 30;
        $request->investmentDate = '12/11/2023';
        $request->vestDate = '12/11/2023';
        $request->roiToDate = 0.3;
        $request->status = 'Pending Approval';

        $requests = [$request, $request];

        $stakingPlan = new \stdClass();
        $stakingPlan->icon = '/build/images/multiversx.55fc098a.png';
        $stakingPlan->project = 'MultiversX';
        $stakingPlan->coin = 'EGLD';
        $stakingPlan->apr = [0.1, 1.5];
        $stakingPlan->lockTime = [30, 60, 90, 365];
        $stakingPlan->investmentDate = '12/11/2023';
        $stakingPlan->status = 'Enter';

        $stakingPlans = [$stakingPlan];

        return $this->render('dashboard/index.html.twig');
    }
}
