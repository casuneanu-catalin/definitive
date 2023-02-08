<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\RequestRepository;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Gedmo\Mapping\Annotation as Gedmo; 

#[ORM\Entity(repositoryClass: RequestRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['requests:read']],
    denormalizationContext: ['groups' => ['requests:write']],
    operations: [
        new Get(),
        new Patch(),
        new Put(),
        new Post(),
        new Delete(),
        new GetCollection()
    ]
)]
#[ApiFilter(SearchFilter::class, properties: [
    'user' => 'exact'
])]
#[Gedmo\SoftDeleteable(fieldName: 'deletedAt', timeAware: false, hardDelete: true)]
class Request
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['requests:read'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['requests:read', 'requests:write'])]
    private ?int $amount = null;

    #[ORM\Column(length: 255)]
    #[Groups(['requests:read', 'requests:write'])]
    private ?string $type = null;

    #[ORM\Column(length: 255)]
    #[Groups(['requests:read', 'requests:write'])]
    private ?string $status = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['requests:read', 'requests:write'])]
    private ?string $hashTx = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['requests:read', 'requests:write'])]
    private ?string $duration = null;

    #[Groups(['requests:read'])]
    private ?string $durationFormatted = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['requests:read', 'requests:write'])]
    private ?User $user = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['requests:read', 'requests:write'])]
    private ?StakingPlan $stakingPlan = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['requests:read', 'requests:write'])]
    private ?\DateTimeInterface $dateCreated = null;

    #[ORM\Column(name: 'deletedAt', type: Types::DATETIME_MUTABLE, nullable: true)]
    private $deletedAt;

    #[Groups(['requests:read'])]
    private string $roiToDate;

    #[Groups(['requests:read'])]
    private string $totalRoi;

    #[Groups(['requests:read'])]
    private string $remainingTime;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $endDate = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmount(): ?int
    {
        return $this->amount;
    }

    public function setAmount(int $amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getHashTx(): ?string
    {
        return $this->hashTx;
    }

    public function setHashTx(string $hashTx): self
    {
        $this->hashTx = $hashTx;

        return $this;
    }

    public function getDuration(): string
    {
        return $this->duration;
    }

    public function getDurationFormatted(): string
    {
        if(!$this->duration) return "";
        
        return $this->duration . " days";
    }

    public function setDuration(?int $duration): self
    {
        $this->duration = $duration;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getStakingPlan(): ?StakingPlan
    {
        return $this->stakingPlan;
    }

    public function setStakingPlan(?StakingPlan $stakingPlan): self
    {
        $this->stakingPlan = $stakingPlan;

        return $this;
    }

    public function getDateCreated(): ?string
    {
        return $this->dateCreated->format('m/d/Y');
    }

    public function getRawDateCreated(): DateTime
    {
        return $this->dateCreated;
    }

    public function setDateCreated(\DateTimeInterface $dateCreated): self
    {
        $this->dateCreated = $dateCreated;

        return $this;
    }

    public function getDeletedAt(): ?DateTime
    {
        return $this->deletedAt;
    }

    public function setDeletedAt(?DateTime $deletedAt): void
    {
        $this->deletedAt = $deletedAt;
    }

    private function getApr():float
    {
        if (!$this->stakingPlan)
            return 0.000;
        $apr = $this->stakingPlan->getAprForDuration($this->duration);
        $apr = new ArrayCollection($apr);
        return $apr->first()["apr"] / 1000;
    }

    private function getDailyRoi():int|float
    {
        $apr = $this->getApr();
        $duration = $this->duration;

        if (!$apr || !$duration)
            return 0.00;

        return $apr / $duration;
    }

    public function getRoiToDate(): string
    {
        if (!$this->stakingPlan)
            return "";

        $daysDifference = date_diff($this->dateCreated, new DateTime())->format("%D");
        $roiToDate = number_format($daysDifference * $this->getDailyRoi() * $this->amount / 1000, 3);
        return "$roiToDate {$this->stakingPlan->getCoin()->getToken()}";
    }

    public function getTotalRoi(): string
    {
        if (!$this->stakingPlan)
            return "";

        return number_format(($this->amount / 1000) * $this->getApr(), 3) . " " .$this->stakingPlan->getCoin()->getToken();
    }

    public function getRemainingTime(): string
    {
        if (!$this->duration)
            return "";

        $vestDate = date_add($this->dateCreated, date_interval_create_from_date_string("$this->duration days"));
        $now = new DateTime();
        return $now->diff($vestDate)->format("%a") . " days";
    }

    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->endDate;
    }

    public function setEndDate(?\DateTimeInterface $endDate): self
    {
        $this->endDate = $endDate;

        return $this;
    }
}
