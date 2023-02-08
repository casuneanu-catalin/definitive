<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Balance;
use App\Repository\BalanceRepository;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserProcessor implements ProcessorInterface
{
    public function __construct(
        private ProcessorInterface $decorated, 
        private UserPasswordHasherInterface $passwordHasher,
        private BalanceRepository $balanceRepository
    ){}

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = [])
    {
        if (!$data->getPassword()) {
            return $this->decorated->process($data, $operation, $uriVariables, $context);
        }

        $hashedPassword = $this->passwordHasher->hashPassword(
            $data,
            $data->getPassword()
        );
        $data->setPassword($hashedPassword);
        $data->eraseCredentials();

        // add default empty balance to the user
        $balance = new Balance();
        $balance->setDefaults();
        $this->balanceRepository->save($balance, true);
        $data->setBalance($balance);

        return $this->decorated->process($data, $operation, $uriVariables, $context);
    }
}
