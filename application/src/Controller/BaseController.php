<?php

/**
 * Pimcore.
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Enterprise License (PEL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 *  @license    http://www.pimcore.org/license     GPLv3 and PEL
 */

declare(strict_types=1);

namespace App\Controller;

use App\Service\NavigationService;
use Pimcore\Controller\FrontendController;
use Pimcore\Model\DataObject;
use Pimcore\Tool;
use Symfony\Component\HttpFoundation\Request;

class BaseController extends FrontendController
{
    public function __construct(
        private readonly NavigationService $navigationService,
    ) {
    }

    protected function verifyPreviewRequest(Request $request, DataObject $object): bool
    {
        if (Tool::isElementRequestByAdmin($request, $object)) {
            return true;
        }

        return false;
    }

    protected function getAllParameters(Request $request): array
    {
        $parameters                   = array_merge($request->request->all(), $request->query->all());
        $parameters['authors']        = $this->getAuthors();
        $parameters['socialChannels'] = $this->getSocialChannels();

        return $parameters;
    }

    /** @return DataObject\Author[] */
    private function getAuthors(): array
    {
        $listing = new DataObject\Author\Listing();

        return $listing->getObjects();
    }

    /** @return DataObject\SocialChannel[] */
    private function getSocialChannels(): array
    {
        $listing = new DataObject\SocialChannel\Listing();

        return $listing->getObjects();
    }
}
