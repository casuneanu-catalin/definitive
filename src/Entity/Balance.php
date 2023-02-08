<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\BalanceRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource]
#[ORM\Entity(repositoryClass: BalanceRepository::class)]
class Balance
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['users:read'])]
    private ?int $total = null;

    #[ORM\Column]
    #[Groups(['users:read'])]
    private ?int $staked = null;

    #[ORM\Column]
    #[Groups(['users:read', 'users:write'])]
    private ?int $initial = null;

    #[ORM\Column]
    #[Groups(['users:read'])]
    private ?int $withdrawable = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTotal(): ?int
    {
        return $this->staked + $this->withdrawable + $this->initial;
    }

    public function getStaked(): ?int
    {
        return $this->staked;
    }

    public function setStaked(?int $staked = 0): self
    {
        $this->staked = $staked;

        return $this;
    }

    public function getInitial(): ?int
    {
        return $this->initial;
    }

    public function setInitial(?int $initial = 0): self
    {
        $this->initial = $initial;
        $this->total += $initial;

        return $this;
    }

    public function getWithdrawable(): ?int
    {
        return $this->withdrawable;
    }

    public function setWithdrawable(?int $withdrawable = 0): self
    {
        $this->withdrawable = $withdrawable;

        return $this;
    }

    public function setDefaults():self
    {
        $this->setInitial();
        $this->setWithdrawable();
        $this->setStaked();

        return $this;
    }
}
