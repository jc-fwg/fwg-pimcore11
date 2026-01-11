<?php

declare(strict_types=1);

namespace App\Controller\Admin;

use App\Adapter\App\Database\Doctrine\Repository\BlogpostRepository;
use App\Service\BlogpostService;
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
    #[Route('/admin/app/blogpost/broken-links/{blogpostId}', name: 'admin_app_blogpost_broken_links', methods: [Request::METHOD_GET])]
    public function infotextAction(string $blogpostId): Response
    {
        $blogpost = $this->blogpostRepository->findById($blogpostId);

        if (!$blogpost instanceof Blogpost) {
            return new Response(
                'Blogpost not found',
                Response::HTTP_NOT_FOUND,
            );
        }

        $externalLinks = $this->blogpostService->getExternalLinksStatus($blogpost);

        /**
         * @todo
         * - Blogpost DO : Data quality externalLinksLastChecked
         * - Blogpost DO : Data quality externalLinksStatus
         * - $externalLinks array as JSON -> externalLinksStatus
         * - externalLinksLastChecked = now
         * - DataQuality view for externalLinksStatus and externalLinksLastChecked
         * - Validation to inform that check is done with "No broken links found" or "Broken links found" and "Reload object to recheck"
         */

        return new Response(
            'Broken links check successful',
            Response::HTTP_OK,
        );
    }
}
