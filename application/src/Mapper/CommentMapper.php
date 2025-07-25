<?php

declare(strict_types=1);

namespace App\Mapper;

use App\Adapter\App\Database\Doctrine\Repository\CommentRepository;
use App\Dto\CommentDto;
use Pimcore\Model\DataObject\AbstractObject;
use Pimcore\Model\DataObject\Comment;
use Pimcore\Model\DataObject\Service;

use function sprintf;

class CommentMapper
{
    public function __construct(
        private readonly CommentRepository $commentRepository,
    ) {
    }

    public function fromModel(Comment $model): CommentDto
    {
        $referenceComment    = $model->getReferenceComment();
        $referenceCommentDto = null;
        if ($referenceComment instanceof Comment) {
            $referenceCommentDto = $this->fromModel($referenceComment);
        }

        return new CommentDto(
            parentId: $model->getParentId(),
            dateTime: $model->getDateTime(),
            name: $model->getName(),
            email: $model->getEmail(),
            comment: $model->getComment(),
            referenceComment: $referenceCommentDto,
            website: $model->getWebsite(),
            id: $model->getId()
        );
    }

    public function toModel(CommentDto $dto): Comment
    {
        $model = $this->commentRepository->findById((string) $dto->id);

        if (!$model instanceof Comment) {
            $model = new Comment();
            $model->setParentId($dto->parentId);
            $model->setKey(Service::getValidKey(
                sprintf(
                    '%s-%s',
                    $dto->parentId,
                    $dto->dateTime->format('Y-m-d H:i:s')
                ),
                AbstractObject::OBJECT_TYPE_OBJECT)
            );
        }

        // Reference comment
        if ($dto->referenceComment instanceof CommentDto) {
            $referenceComment = $this->commentRepository->findById((string) $dto->referenceComment->id);

            if ($referenceComment instanceof Comment) {
                $model->setReferenceComment($referenceComment);
            }
        }

        $model->setDateTime($dto->dateTime);
        $model->setName($dto->name);
        $model->setEmail($dto->email);
        $model->setComment($dto->comment);
        $model->setWebsite($dto->website);

        return $model;
    }
}
