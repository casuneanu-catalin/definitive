<?php

namespace App\Repository;

use App\Entity\Balance;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class BalanceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Balance::class);
    }

    public function save(Balance $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Balance $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function withdraw(Balance $entity, int $amount):void
    {
        $entity->setWithdrawable($entity->getWithdrawable() - $amount);
        $this->getEntityManager()->persist($entity);
        $this->getEntityManager()->flush();
    }

    public function deposit(Balance $entity, int $amount):void
    {
        $entity->setInitial($entity->getInitial() + $amount);
        $this->getEntityManager()->persist($entity);
        $this->getEntityManager()->flush();
    }

    public function handleStakingComplete(Balance $entity, int $amount):void
    {
        $entity->setStaked($entity->getStaked() - $amount);
        $entity->setWithdrawable($entity->getWithdrawable() + $amount);
        $this->getEntityManager()->persist($entity);
        $this->getEntityManager()->flush();
    }
}
