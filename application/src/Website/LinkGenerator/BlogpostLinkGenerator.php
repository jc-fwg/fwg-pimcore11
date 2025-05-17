<?php

namespace App\Website\LinkGenerator;

use App\Website\Tool\ForceInheritance;
use App\Website\Tool\Text;
use Pimcore\Http\Request\Resolver\DocumentResolver;
use Pimcore\Localization\LocaleServiceInterface;
use Pimcore\Model\DataObject\ClassDefinition\LinkGeneratorInterface;
use Pimcore\Model\DataObject\Concrete;
use Pimcore\Model\DataObject\Blogpost;
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
     *
     * @param DocumentResolver       $documentResolver
     * @param RequestStack           $requestStack
     * @param PimcoreUrl             $pimcoreUrl
     * @param LocaleServiceInterface $localeService
     */
    public function __construct(
        DocumentResolver $documentResolver,
        RequestStack $requestStack,
        PimcoreUrl $pimcoreUrl,
        LocaleServiceInterface $localeService
    ) {
        $this->documentResolver = $documentResolver;
        $this->requestStack = $requestStack;
        $this->pimcoreUrl = $pimcoreUrl;
        $this->localeService = $localeService;
    }



    /**
     * Returns URL part by
     * - replacing + with plus
     * - stripping some not wanted characters like registered trademark
     *
     * @param string $string
     * @return string
     */
    private function getSanitizedUrlString($string) : string
    {
        $string = str_replace('+', ' plus', $string);
        return preg_replace( '/[^a-z0-9- ]/i', '', $string);
    }

    public function generate(object $object, array $params = []): string
    {
        if (!($object instanceof BlogPost)) {
            throw new \InvalidArgumentException('Given object is not an blogpost instance');
        }

        return ForceInheritance::run(
            function () use ($object, $params) {
                return $this->pimcoreUrl->__invoke(
                    [
                        'blogposttitle' => Text::toUrl(
                            $object->getHeadline() ?
                                $this->getSanitizedUrlString($object->getHeadline()) :
                                'blogpost'
                        ),
                        'topic' => Text::toUrl(

                                'topic'
                        ),
//                        'topic' => Text::toUrl(
//                            $object->getBlogpostTopic() ?
//                                $this->getSanitizedUrlString($object->getBlogpostTopic()->getTopicTitle()) :
//                                'topic'
//                        ),
                        'blogpost' => $object->getId(),
                    ],
                    'blogpost-detail',
                    true
                );
            }
        );
    }
}
