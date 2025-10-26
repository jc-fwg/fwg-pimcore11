<?php

namespace App\Renderer\Blogpost;

use App\Adapter\App\Database\Doctrine\Repository\BlogpostRepository;
use App\Service\BlogpostService;
use Pimcore\Model\DataObject\Blogpost;
use Pimcore\Model\DataObject\ClassDefinition\Layout\DynamicTextLabelInterface;
use Pimcore\Model\DataObject\Concrete;

class DataQualityTextRenderer implements DynamicTextLabelInterface
{
    private const string HTML_WRAPPER = '<div class="alert alert-%s">%s</div>';

    public function __construct(
        private readonly BlogpostService $blogpostService,
    )
    {
    }

    public function renderLayoutText(string $data, ?Concrete $object, array $params): string
    {
        if (!$object instanceof Blogpost) {
            return '';
        }

        $dataQuality = $this->blogpostService->checkDataQuality($object);

        $issues = $dataQuality[$data] ?? [];

        if (count($issues) === 0) {
            return sprintf(self::HTML_WRAPPER, 'success', 'no issues found');
        }

        $issuesAsHtml = array_map(fn(string $issue) => '<li>' . $issue . '</li>', $issues);
        $issuesHtmlString = implode('', $issuesAsHtml);

        return sprintf(self::HTML_WRAPPER, 'danger', '<ul style="padding-left: 10px !important; margin: 0 !important">' . $issuesHtmlString . '</ul>');
    }
}
