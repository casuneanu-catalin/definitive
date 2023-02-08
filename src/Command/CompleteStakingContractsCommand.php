<?php

namespace App\Command;

use App\Repository\RequestRepository;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'completeStakingContracts',
    description: 'Checks if there are any staking contracts due to close and closes them',
)]
class CompleteStakingContractsCommand extends Command
{
    public function __construct(
        private RequestRepository $requestRepository
    )
    {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addOption('dry-run', null, InputOption::VALUE_NONE, 'Dry run')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        if ($input->getOption('dry-run')) {
            $io->note('Dry mode enabled');
            $count = $this->requestRepository->countStakingContracts();
            $io->success(sprintf('"%d" staking contracts that are due to closing', $count));

            return Command::SUCCESS;
        }

        $this->requestRepository->finishStakeContracts();
        $io->success("Success.");
        return Command::SUCCESS;
    }
}
