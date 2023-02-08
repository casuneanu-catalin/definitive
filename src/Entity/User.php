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
use App\Repository\UserRepository;
use App\State\UserProcessor;
use DateTime;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\NotNull;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\HttpFoundation\File\File;
use Gedmo\Mapping\Annotation as Gedmo;

#[Vich\Uploadable]
#[ORM\Entity(repositoryClass: UserRepository::class)]
#[UniqueEntity(fields: ['email'], message: 'There is already an account with this email')]
#[
    ApiResource(
        normalizationContext: ['groups' => ['users:read']],
        denormalizationContext: ['groups' => ['users:write']],
        operations: [
            new Get(),
            new Patch(),
            new Put(),
            new Post(
                processor: UserProcessor::class,
                inputFormats: ['multipart' => ['multipart/form-data']]
            ),
            new GetCollection(),
            new Delete()
        ]
    ),
]
#[ApiFilter(SearchFilter::class, properties: [
    'email' => 'exact'
])]
#[Gedmo\SoftDeleteable(fieldName: 'deletedAt', timeAware: false, hardDelete: true)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['users:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    #[NotBlank()]
    #[Groups(['users:read', 'users:write', 'requests:read'])]
    private ?string $email = null;

    #[ORM\Column]
    #[NotNull()]
    #[Groups(['users:read', 'users:write'])]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    #[Groups(['users:write'])]
    private ?string $password = null;

    #[ORM\Column(length: 255)]
    #[Groups(['users:read', 'users:write', 'requests:read'])]
    private ?string $firstName = null;

    #[ORM\Column(length: 255)]
    #[Groups(['users:read', 'users:write', 'requests:read'])]
    private ?string $lastName = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['users:read', 'users:write'])]
    private ?\DateTimeInterface $dateCreated = null;

    #[Groups(['users:write', 'users:read'])]
    #[ORM\Column(length: 255)]
    private ?string $status = null;

    #[Groups(['users:read', 'users:write'])]
    #[ORM\Column(length: 255)]
    private ?string $addressCountry = null;

    #[Groups(['users:write', 'users:read'])]
    #[ORM\Column(length: 255)]
    private ?string $addressPostcode = null;

    #[Groups(['users:write', 'users:read'])]
    #[ORM\Column(length: 255)]
    private ?string $addressLine = null;

    #[Vich\UploadableField(mapping: "media_object", fileNameProperty: "passportPhotoPath")]
    #[Groups(['users:write'])]
    public ?File $file = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['users:read'])]
    private ?string $passportPhotoPath = null;

    #[ORM\Column(name: 'deletedAt', type: Types::DATETIME_MUTABLE, nullable: true)]
    private $deletedAt;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['users:read', 'users:write'])]
    private ?Balance $balance = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getDateCreated(): ?\DateTimeInterface
    {
        return $this->dateCreated;
    }

    public function setDateCreated(?\DateTimeInterface $dateCreated): self
    {
        if($dateCreated) {
            $this->dateCreated = $dateCreated;
        }else{
            $this->dateCreated = new DateTime();
        }

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

    public function getAddressCountry(): ?string
    {
        return $this->addressCountry;
    }

    public function setAddressCountry(string $addressCountry): self
    {
        $this->addressCountry = $addressCountry;

        return $this;
    }

    public function getAddressPostcode(): ?string
    {
        return $this->addressPostcode;
    }

    public function setAddressPostcode(string $addressPostcode): self
    {
        $this->addressPostcode = $addressPostcode;

        return $this;
    }

    public function getAddressLine(): ?string
    {
        return $this->addressLine;
    }

    public function setAddressLine(string $addressLine): self
    {
        $this->addressLine = $addressLine;

        return $this;
    }

    public function getPassportPhotoPath(): ?string
    {
        $appUrl =  "https://www.definitive.quantic-technologies.net";
        return "$appUrl/media/{$this->passportPhotoPath}";
    }

    public function setPassportPhotoPath(?string $passportPhotoPath): self
    {
        $this->passportPhotoPath = $passportPhotoPath;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;

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

    public function getBalance(): ?Balance
    {
        return $this->balance;
    }

    public function setBalance(Balance $balance): self
    {
        $this->balance = $balance;

        return $this;
    }
}
