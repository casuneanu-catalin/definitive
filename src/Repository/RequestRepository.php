<?php

namespace App\Repository;

use App\Entity\Request;
use DateInterval;
use DateTimeImmutable;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Request>
 *
 * @method Request|null find($id, $lockMode = null, $lockVersion = null)
 * @method Request|null findOneBy(array $criteria, array $orderBy = null)
 * @method Request[]    findAll()
 * @method Request[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RequestRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Request::class);
    }

    public function save(Request $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Request $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function createEndDate(Request $entity): void
    {
        $dateCreated = $entity->getRawDateCreated();
        $entity->setEndDate($dateCreated->modify("+{$entity->getDurationFormatted()}"));
        $this->getEntityManager()->persist($entity);
    }

    private function getApprovedAndEndDateOlderThanOneHourQueryBuilder(): QueryBuilder
    {
        $now = new DateTimeImmutable();
        $oneHourAgo = $now->sub(new DateInterval('PT1H'));

        return $this->createQueryBuilder('c')
            ->andWhere('c.status = :state_approved')
            ->andWhere('c.endDate >= :one_hour_ago')
            ->andWhere('c.endDate <= :now')
            ->setParameters([
                'state_approved' => 'approved',
                'one_hour_ago' => $oneHourAgo,
                'now' => $now
            ]);
    }

    public function finishStakeContracts():void
    {
        $query = $this->getApprovedAndEndDateOlderThanOneHourQueryBuilder()->set('status', 'completed');
        $batchSize = 20;
        $i = 1;

        /** @var Request $request */
        foreach ($query->getQuery()->toIterable() as $request) {
            $request->setStatus('completed');
            ++$i;
            if (($i % $batchSize) === 0) {
                $this->getEntityManager()->flush();
                $this->getEntityManager()->clear();
            }
        }
        $this->getEntityManager()->flush();
    }

    public function countStakingContracts():int
    {
        return $this->getApprovedAndEndDateOlderThanOneHourQueryBuilder()
            ->select('COUNT(c.id)')
            ->getQuery()
            ->getSingleScalarResult();
    }
}
