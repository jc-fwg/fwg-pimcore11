<?php

declare(strict_types=1);

namespace App\Command\App;

use App\Adapter\App\Database\Doctrine\Repository\BlogpostRepository;
use App\Service\BlogpostService;
use Exception;
use Pimcore\Bundle\ApplicationLoggerBundle\ApplicationLogger;
use Pimcore\Console\AbstractCommand;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\HttpFoundation\Response;

use function sprintf;

#[AsCommand(
    name: 'app:blogpost:report-broken-links',
    description: 'Iterates all Blogposts and reports broken links found in their content.',
)]
class ReportBrokenLinksCommand extends AbstractCommand
{
    public function __construct(
        private readonly BlogpostRepository $blogpostRepository,
        private readonly BlogpostService $blogpostService,
    ) {
        parent::__construct();
    }

    /**
     * @throws Exception
     */
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $blogposts = $this->blogpostRepository->findAll();

        foreach ($blogposts as $blogpost) {
            $this->writeInfo(sprintf('Processing Blogpost ID: %s (%s)...', $blogpost->getId(), $blogpost->getKey()));

            $this->output->writeln('...fetching external links status...');
            $externalLinks = $this->blogpostService->getExternalLinksStatus($blogpost);

            $this->output->writeln('...processing links...');

            foreach ($externalLinks as $statusCode => $links) {
                if ($statusCode === Response::HTTP_OK) {
                    continue;
                }

                foreach ($links as $link) {
                    $logMessage = sprintf(
                        'Broken link (%s): Blogpost "%s" (%s) : "%s" : %s',
                        $statusCode,
                        $blogpost->getKey(),
                        $blogpost->getId(),
                        $link['text'],
                        $link['url'],
                    );

                    ApplicationLogger::getInstance()->alert($logMessage);
                    $this->output->writeln('...'.$logMessage);
                }
            }

        }

        $this->writeComment('All Blogposts processed.');

        return self::SUCCESS;
    }
}
