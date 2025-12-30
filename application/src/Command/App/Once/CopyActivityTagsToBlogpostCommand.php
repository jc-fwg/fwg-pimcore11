<?php

declare(strict_types=1);

namespace App\Command\App\Once;

use App\Adapter\App\Database\Doctrine\Repository\BlogpostRepository;
use Exception;
use Pimcore\Console\AbstractCommand;
use Pimcore\Model\DataObject\Activity;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

use function sprintf;

#[AsCommand(
    name: 'app:once:copy-activity-tags-to-blogpost',
    description: 'Copies Tags from Activity data objects to Blogpost data objects',
)]
class CopyActivityTagsToBlogpostCommand extends AbstractCommand
{
    public function __construct(
        private readonly BlogpostRepository $blogpostRepository,
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
            $this->output->writeln(sprintf('Processing Blogpost ID: %s (%s)...', $blogpost->getId(), $blogpost->getTitle()));
            $activity = $blogpost->getActivity();

            if (!$activity instanceof Activity) {
                $this->output->writeln('...no related Activity found, skipping.');
                continue;
            }

            $tags = $activity->getTags();

            $blogpost->setTags($tags);

            $this->blogpostRepository->persist($blogpost);

            $this->output->writeln('...tags copied successfully');
        }

        return self::SUCCESS;
    }
}
