<?php

declare(strict_types=1);

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

namespace App\Controller;

use Exception;
use Pimcore\Controller\FrontendController;
use Pimcore\Model\Document\Hardlink;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Web2printController extends FrontendController
{
    public function defaultAction(Request $request): Response
    {
        $paramsBag = [
            'document' => $this->document,
        ];

        foreach ($request->attributes as $key => $value) {
            $paramsBag[$key] = $value;
        }

        $paramsBag = array_merge($request->request->all(), $request->query->all(), $paramsBag);

        if ($this->document->getProperty('hide-layout')) {
            return $this->render('web2print/default_no_layout.html.twig', $paramsBag);
        }

        return $this->render('web2print/default.html.twig', $paramsBag);
    }

    /**
     * @throws Exception
     */
    public function containerAction(Request $request): Response
    {
        $paramsBag = [
            'document' => $this->document,
        ];

        foreach ($request->attributes as $key => $value) {
            $paramsBag[$key] = $value;
        }

        $allChildren = [];

        // prepare children for include
        foreach ($this->document->getAllChildren() as $child) {
            if ($child instanceof Hardlink) {
                $child = Hardlink\Service::wrap($child);
            }

            $child->setProperty('hide-layout', 'bool', true, false, true);

            $allChildren[] = $child;
        }

        $paramsBag['allChildren'] = $allChildren;

        return $this->render('web2print/container.html.twig', $paramsBag);
    }
}
