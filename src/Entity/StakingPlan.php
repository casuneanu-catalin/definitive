<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Entity\Coin;
use App\Repository\StakingPlanRepository;
use DateTime;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Gedmo\Mapping\Annotation as Gedmo; 

#[ORM\Entity(repositoryClass: StakingPlanRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['stakingPlans:read']],
    denormalizationContext: ['groups' => ['stakingPlans:write']],
    operations: [
        new Get(),
        new Patch(),
        new Put(),
        new Post(),
        new GetCollection(),
        new Delete()
    ]
)]
#[Gedmo\SoftDeleteable(fieldName: 'deletedAt', timeAware: false, hardDelete: true)]
class StakingPlan
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['stakingPlans:read', 'requests:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['stakingPlans:read', 'stakingPlans:write'])]
    private ?string $status = null;

    #[ORM\Column(type: Types::JSON)]
    #[Groups(['stakingPlans:read', 'stakingPlans:write'])]
    private array $durations = [];

    #[Groups(['stakingPlans:read'])]
    private string $formattedDurations = "";

    #[Groups(['stakingPlans:read'])]
    private string $formattedAprs = "";

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['stakingPlans:read', 'stakingPlans:write', 'requests:read'])]
    private ?Coin $coin = null;

    #[ORM\Column(type: Types::JSON)]
    #[Groups(['stakingPlans:read', 'stakingPlans:write'])]
    private array $networks = [];

    #[ORM\Column(name: 'deletedAt', type: Types::DATETIME_MUTABLE, nullable: true)]
    private $deletedAt;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getDurations(): array
    {
        $durations = [];
        foreach($this->durations as $value) {
            array_push($durations, [
                "duration" => $value["duration"],
                "apr" => $value["apr"] / 1000
            ]);
        }
        return $durations;
    }

    public function setDurations(array $durations): self
    {
        $formattedDurations = [];
        foreach($durations as $value) {
            array_push($formattedDurations, [
                "duration" => $value["duration"],
                "apr" => $value["apr"] * 100
            ]);
        }

        $this->durations = $formattedDurations;

        return $this;
    }

    public function getCoin(): ?Coin
    {
        return $this->coin;
    }

    public function setCoin(?Coin $coin): self
    {
        $this->coin = $coin;

        return $this;
    }

    public function getNetworks(): array
    {
        return $this->networks;
    }

    public function setNetworks(array $networks): self
    {
        $this->networks = $networks;

        return $this;
    }

    public function getFormattedDurations(): string
    {
        $extractDurations = function (array $durationAprArray): int {
            return $durationAprArray['duration'];
        };

        $durations = array_map($extractDurations, $this->durations);
        $formattedDurations = "";
        if(count($durations) === 1) {
            $firstValue = array_values($durations)[0];
            return "$firstValue days";
        }
        sort($durations);
        foreach (($durations) as $key => $value) {
            if ($key === array_key_last($durations)) {
                $formattedDurations = "$formattedDurations, $value days";
            } else if ($key === array_key_first($durations)) {
                $formattedDurations = $value;
            } else {
                $formattedDurations = "$formattedDurations, $value";
            }
        }
        return $formattedDurations;
    }

    public function getFormattedAprs(): string
    {
        $extractAprs = function (array $durationAprArray): int {
            return $durationAprArray['apr'];
        };
        
        $aprs = array_map($extractAprs, $this->durations);

        if (count($aprs) == 1)
            return $aprs[0] / 100 . "%";

        $formattedAprs = (min($aprs) / 100) . "%-" . (max($aprs) / 100) . "%";
        return $formattedAprs;
    }

    public function getAprForDuration(int $duration): array
    {
        return array_filter($this->durations, function ($v) use ($duration) {
            return $v["duration"] == $duration;
        });
    }

    public function getDeletedAt(): ?DateTime
    {
        return $this->deletedAt;
    }

    public function setDeletedAt(?DateTime $deletedAt): void
    {
        $this->deletedAt = $deletedAt;
    }
}
