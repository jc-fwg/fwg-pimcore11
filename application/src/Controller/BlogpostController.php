<?php

declare(strict_types=1);

namespace App\Controller;

use App\Adapter\App\Database\Doctrine\Repository\TagRepository;
use App\Service\BlogpostService;
use App\Service\CollectionService;
use Pimcore\Model\DataObject\Collection;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class BlogpostController.
 */
class BlogpostController extends BaseController
{
    public function __construct(
        private readonly BlogpostService    $blogpostService,
        private readonly CollectionService $collectionService,
        private readonly TagRepository $tagRepository,
    ) {
    }

    /**
     * @throws \Exception
     */
    public function listAction(Request $request): Response
    {
        $paramBag = $this->getAllParameters($request);

        $collection = $this->document?->getEditable('collection')?->getElement();

        if ($collection instanceof Collection) {
            $blogposts = $this->blogpostService->getBlogpostsByCollection($collection);
        }

        return $this->render('content/blogpost/list.html.twig', array_merge($paramBag, [
            'collection' => $collection,
            'collections' => $this->collectionService->getRecommendedCollections($collection),
            'blogposts' => $blogposts ?? [],
            'tags' => $this->tagRepository->findAllOrderedByTagCategoryWeighting(),
        ]));
    }
}
