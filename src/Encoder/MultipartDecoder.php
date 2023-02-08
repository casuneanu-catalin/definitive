<?php

namespace App\Encoder;

use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Serializer\Encoder\DecoderInterface;

class MultipartDecoder implements DecoderInterface
{
    public const FORMAT = 'multipart';

    public function __construct(private RequestStack $requestStack)
    {
    }

    /**
     * {@inheritdoc}
     */
    public function decode(string $data, string $format, array $context = []): ?array
    {
        $request = $this->requestStack->getCurrentRequest();

        if (!$request) {
            return null;
        }
        $requestData = array_filter($request->request->all(), function($k) {
            return $k !== 'jsonData';
        }, ARRAY_FILTER_USE_KEY);
        $jsonData =  json_decode($request->request->get('jsonData'), true);

        return ($jsonData ?? []) + $requestData + $request->files->all();
    }

    /**
     * {@inheritdoc}
     */
    public function supportsDecoding(string $format): bool
    {
        return self::FORMAT === $format;
    }
}
