<?php

declare(strict_types=1);

namespace App\Mapper;

use App\Adapter\App\Database\Doctrine\Repository\AuthorRepository;
use App\Adapter\App\Database\Doctrine\Repository\BlogpostRepository;
use App\Dto\BlogpostDto;
use App\Dto\LinkDto;
use App\Website\LinkGenerator\BlogpostLinkGenerator;
use Exception;
use Pimcore\Model\DataObject\Author;
use Pimcore\Model\DataObject\Blogpost;
use Pimcore\Model\DataObject\Data\Link;

use function count;

class BlogpostMapper
{
    public function __construct(
        private readonly ActivityMapper $activityMapper,
        private readonly AuthorRepository $authorRepository,
        private readonly AuthorMapper $authorMapper,
        private readonly CommentMapper $commentMapper,
        private readonly BlogpostLinkGenerator $blogpostLinkGenerator,
        private readonly BlogpostRepository $blogpostRepository,
    ) {
    }

    /**
     * @throws Exception
     */
    public function fromModel(Blogpost $model): BlogpostDto
    {
        // Authors
        $authorsIds = $model->getAuthors() ?? [];
        $authors    = [];
        foreach ($authorsIds as $authorId) {
            $author = $this->authorRepository->findOneById((int) $authorId);

            if (!$author instanceof Author) {
                continue;
            }

            $authors[] = $this->authorMapper->fromModel($author);
        }

        // Links
        $links = [];
        foreach ($model->getLinks() ?? [] as $blockElement) {
            /** @var Link $link */
            $link    = $blockElement['link'] ?? null;
            $links[] = new LinkDto(
                $link->getData()->getText(),
                $link->getData()->getPath(),
            );
        }

        // Comments
        $comments    = $this->blogpostRepository->getCommentTree($model->getId());
        $commentDtos = [];
        foreach ($comments as $key => $comment) {
            $currentComment = $comment;
            $commentDto     = $this->commentMapper->fromModel($currentComment['comment']);

            while (count($currentComment['children']) > 0) {
                foreach ($currentComment['children'] as $childComment) {
                    $childCommentDto        = $this->commentMapper->fromModel($childComment['comment']);
                    $commentDto->children[] = $childCommentDto;

                    $currentComment = $childComment;
                }
            }
            $commentDtos[] = $commentDto;
        }

        return new BlogpostDto(
            id: $model->getId(),
            publicationDate: $model->getPublicationDate(),
            blogpostType: $model->getBlogpostType(),
            authors: $authors,
            activity: $model->getActivity() ? $this->activityMapper->fromModel($model->getActivity()) : null,
            categories: $model->getCategories() ?? [],
            imageMain: $model->getImageMain(),
            assetsFolder: $model->getAssetsFolder(),
            previewText: $model->getPreviewText(),
            imageTeaser: $model->getImageTeaser(),
            downloads: $model->getDownloads(),
            links: $links,
            title: $model->getTitle(),
            subTitle: $model->getSubTitle(),
            content: $model->getContent(),
            metaTitle: $model->getMetaTitle(),
            metaDescription: $model->getMetaDescription(),
            hashtags: $model->getHashtags(),
            hashtagsCalculated: $model->getHashtagsCalculated(),
            detailLink: $this->blogpostLinkGenerator->generate($model),
            comments: $commentDtos,
        );
    }
}
