<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\CoinRepository;
use DateTime;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\HttpFoundation\File\File;
use Gedmo\Mapping\Annotation as Gedmo; 
use Doctrine\DBAL\Types\Types;

#[Vich\Uploadable]
#[ORM\Entity(repositoryClass: CoinRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['coin:read']],
    denormalizationContext: ['groups' => ['coin:write']],
    operations: [ 
        new Get(),
        new GetCollection(),
        new Patch(),
        new Post(inputFormats: ['multipart' => ['multipart/form-data']]),
        new Delete()
    ]
)]
#[Gedmo\SoftDeleteable(fieldName: 'deletedAt', timeAware: false, hardDelete: true)]
class Coin
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['coin:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['coin:write', 'coin:read', 'stakingPlans:read', 'requests:read'])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Groups(['coin:write', 'coin:read', 'stakingPlans:read', 'requests:read'])]
    private ?string $token = null;

    #[Vich\UploadableField(mapping: "media_object", fileNameProperty: "imagePath")]
    #[Groups(['coin:write'])]
    public ? File $file = null;

    #[ORM\Column(length: 255)]
    #[Groups(['coin:read', 'stakingPlans:read', 'requests:read'])]
    private ?string $imagePath = null;

    #[ORM\Column(name: 'deletedAt', type: Types::DATETIME_MUTABLE, nullable: true)]
    private $deletedAt;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getToken(): ?string
    {
        return $this->token;
    }

    public function setToken(string $token): self
    {
        $this->token = $token;

        return $this;
    }

    public function getImagePath(): ?string
    {
        $appUrl =  "https://www.definitive.quantic-technologies.net";
        return "$appUrl/media/{$this->imagePath}";
    }

    public function setImagePath(?string $imagePath = null): self
    {
        $this->imagePath = $imagePath;

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
}
