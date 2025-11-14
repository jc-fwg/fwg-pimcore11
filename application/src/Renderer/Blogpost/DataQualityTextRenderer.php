<?php

declare(strict_types=1);

namespace App\Renderer\Blogpost;

use App\Service\BlogpostService;
use Exception;
use Pimcore\Model\DataObject\Blogpost;
use Pimcore\Model\DataObject\ClassDefinition\Layout\DynamicTextLabelInterface;
use Pimcore\Model\DataObject\Concrete;
use Symfony\Component\Validator\ConstraintViolationList;
use function count;
use function sprintf;

class DataQualityTextRenderer implements DynamicTextLabelInterface
{
    private const string HTML_WRAPPER = '<div class="alert alert-%s">%s</div>';

    public function __construct(
        private readonly BlogpostService $blogpostService,
    ) {
    }

    /**
     * @throws Exception
     */
    public function renderLayoutText(string $data, ?Concrete $object, array $params): string
    {
        if (!$object instanceof Blogpost) {
            return '';
        }

        $dataQuality = $this->blogpostService->checkDataQuality($object);

        /** @var ConstraintViolationList $issues */
        $issues = $dataQuality[$data] ?? [];

        if (count($issues) === 0) {
            return sprintf(self::HTML_WRAPPER, 'success', 'no issues found');
        }

        $issuesAsHtml = [];
        foreach ($issues as $issue) {
            $issuesAsHtml[] = sprintf(
                '<li>%s : %s</li>',
                $issue->getPropertyPath(),
                $issue->getMessageTemplate()
            );
        }
        $issuesHtmlString = implode('', $issuesAsHtml);

        return sprintf(self::HTML_WRAPPER, 'danger', '<ul style="padding-left: 10px !important; margin: 0 !important">'.$issuesHtmlString.'</ul>');
    }
}
