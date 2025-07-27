<?php

declare(strict_types=1);

namespace App\Website\LinkGenerator;

use App\Website\Tool\ForceInheritance;
use App\Website\Tool\Text;
use InvalidArgumentException;
use Pimcore\Http\Request\Resolver\DocumentResolver;
use Pimcore\Localization\LocaleServiceInterface;
use Pimcore\Model\DataObject\Blogpost;
use Pimcore\Model\DataObject\ClassDefinition\LinkGeneratorInterface;
use Pimcore\Twig\Extension\Templating\PimcoreUrl;
use Symfony\Component\HttpFoundation\RequestStack;

class BlogpostLinkGenerator implements LinkGeneratorInterface
{
    /**
     * @var DocumentResolver
     */
    protected $documentResolver;

    /**
     * @var RequestStack
     */
    protected $requestStack;

    /**
     * @var PimcoreUrl
     */
    protected $pimcoreUrl;

    /**
     * @var LocaleServiceInterface
     */
    protected $localeService;

    /**
     * NewsLinkGenerator constructor.
     */
    public function __construct(
        DocumentResolver $documentResolver,
        RequestStack $requestStack,
        PimcoreUrl $pimcoreUrl,
        LocaleServiceInterface $localeService,
    ) {
        $this->documentResolver = $documentResolver;
        $this->requestStack     = $requestStack;
        $this->pimcoreUrl       = $pimcoreUrl;
        $this->localeService    = $localeService;
    }

    public function generate(object $object, array $params = []): string
    {
        if (!($object instanceof Blogpost)) {
            throw new InvalidArgumentException('Given object is not an blogpost instance');
        }

        return ForceInheritance::run(
            fn () => $this->pimcoreUrl->__invoke(
                [
                    'slug'  => $object->getSlug(),
//                    'topic' => Text::toUrl(
//                        'topic'
//                    ),
                    //                        'topic' => Text::toUrl(
                    //                            $object->getBlogpostTopic() ?
                    //                                $this->getSanitizedUrlString($object->getBlogpostTopic()->getTopicTitle()) :
                    //                                'topic'
                    //                        ),
                ],
                'blogpost-detail',
                true
            )
        );
    }

    /**
     * Returns URL part by
     * - replacing + with plus
     * - stripping some not wanted characters like registered trademark.
     *
     * @param string $string
     */
    private function getSanitizedUrlString($string): string
    {
        $string = str_replace('+', ' plus', $string);

        return preg_replace('/[^a-z0-9- ]/i', '', $string);
    }
}
