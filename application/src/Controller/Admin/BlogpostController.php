<?php

declare(strict_types=1);

namespace App\Controller\Admin;

use App\Adapter\App\Database\Doctrine\Repository\BlogpostRepository;
use App\Service\BlogpostService;
use Carbon\Carbon;
use Exception;
use Pimcore\Model\DataObject\Blogpost;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

use function sprintf;

class BlogpostController extends AbstractController
{
    public function __construct(
        private readonly BlogpostRepository $blogpostRepository,
        private readonly BlogpostService $blogpostService
    ) {
    }

    /**
     * @throws Exception
     */
    #[Route('/admin/app/blogpost/update-external-links-check/{blogpostId}', name: 'admin_app_update_external_links_check', methods: [Request::METHOD_GET])]
    public function updateExternalLinksCheckAction(string $blogpostId): Response
    {
        $blogpost = $this->blogpostRepository->findById($blogpostId);

        if (!$blogpost instanceof Blogpost) {
            return new Response(
                'Blogpost not found',
                Response::HTTP_NOT_FOUND,
            );
        }

        $externalLinks = $this->blogpostService->getExternalLinksStatus($blogpost);

        $jsonData['checkedAt'] = Carbon::now()->format('Y-m-d H:i:s');
        $jsonData['links'] = $externalLinks;

        $externalLinksJson = json_encode($jsonData);

        /**
         * @todo
         * - Blogpost DO : Data quality externalLinksLastChecked
         * - Blogpost DO : Data quality externalLinksStatus
         * - $externalLinks array as JSON -> externalLinksStatus
         * - externalLinksLastChecked = now
         * - DataQuality view for externalLinksStatus and externalLinksLastChecked
         * - Validation to inform that check is done with "No broken links found" or "Broken links found" and "Reload object to recheck"
         */

        $blogpost->setExternalLinksCheck($externalLinksJson);

        $this->blogpostRepository->persist($blogpost);

        return new Response(
            'External links check successfully executed.',
            Response::HTTP_OK,
        );
    }
}
