<?php

declare(strict_types=1);

namespace App\Controller\Admin;

use App\Adapter\App\Database\Doctrine\Repository\CollectionRepository;
use App\OpenAI\Service\OpenAIService;
use Exception;
use Pimcore\Model\DataObject\Collection;
use Pimcore\Model\Element\ValidationException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

use function sprintf;

class CollectionController extends AbstractController
{
    public function __construct(
        private readonly CollectionRepository $collectionRepository,
        private readonly OpenAIService $chatService,
    ) {
    }

    /**
     * @throws Exception
     */
    #[Route('/admin/app/collection/infotext/{collectionId}', name: 'admin_app_collection_infotext', methods: [Request::METHOD_GET])]
    public function infotextAction(string $collectionId): Response
    {
        throw new ValidationException('Disabled for now');
        $collection = $this->collectionRepository->findById($collectionId);

        if (!$collection instanceof Collection) {
            return new Response(
                'Collection not found',
                Response::HTTP_NOT_FOUND,
            );
        }

        $response = $this->chatService->ask(sprintf('Erstelle mir bitte einen kurzen, informativen Text über %s.', $collection->getTitle()));

        $collection->setDescription($response);

        $this->collectionRepository->persist($collection);

        return new Response(
            'Infotext generated successfully',
            Response::HTTP_OK,
        );
    }
}
