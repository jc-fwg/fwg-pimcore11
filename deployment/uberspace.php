<?php
namespace Deployer;

require 'recipe/pimcore.php';
require 'contrib/crontab.php';

// ### CONFIG ###

set('repository', 'git@github.com:jc-fwg/awm-pimcore11.git');
set('sub_directory', 'application');
set('branch', 'develop'); // todo : lösung für main finden
set('keep_releases', 2);
set('release_name', function () {
    return date('YmdHis');
});
//
//add('shared_files', []);
//add('shared_dirs', []);
//add('writable_dirs', []);

// ### HOSTS ###

host('uberawmediapimcore01')
    ->setHostname('elnath.uberspace.de')
    ->set('remote_user', 'awmedia')
    ->set('deploy_path', '/var/www/virtual/awmedia/awm-pimcore11')
    ->set('update_code_strategy', 'archive')
    ->set('git_ssh_command', 'ssh -o StrictHostKeyChecking=false')
    ->set('http_user', 'awmedia')
    ->set('env_file', '.env.prod.local')
    ->set('ssh_options', [
        'StrictHostKeyChecking=no', // Akzeptiert automatisch neue Hosts
        'UserKnownHostsFile=/dev/null', // Ignoriert die bekannte Hosts-Datei
    ]);

host('uberjochenpimcore01')
    ->setHostname('lepus.uberspace.de')
    ->set('remote_user', 'jochenc')
    ->set('deploy_path', '/var/www/virtual/jochenc/awm-pimcore11')
    ->set('update_code_strategy', 'archive')
    ->set('git_ssh_command', 'ssh -o StrictHostKeyChecking=false')
    ->set('http_user', 'jochenc')
    ->set('env_file', '.env.prod.local')
    ->set('ssh_options', [
        'StrictHostKeyChecking=no', // Akzeptiert automatisch neue Hosts
        'UserKnownHostsFile=/dev/null', // Ignoriert die bekannte Hosts-Datei
    ]);

// ### TASKS ###

// Symlink env_file as .env
desc('Create .env symlink');
task('deploy:env', function () {
    info('Upload {{env_file}} as .env file');
    upload('../application/{{env_file}}', '{{release_path}}/.env');
});

desc('Install pimcore if necessary');
task(
    'pimcore:install',
    function () {
        if (test('[ ! -f {{deploy_path}}/shared/.pimcore.installed ]')) {
            info('Installing Pimcore');
            run('export $(cat {{release_or_current_path}}/{{env_file}} | grep -E \'PIMCORE|DATABASE|MYSQL|OPENSEARCH\') && {{release_or_current_path}}/vendor/bin/pimcore-install --no-interaction --install-bundles');
            run('touch {{deploy_path}}/shared/.pimcore.installed');
        }
    }
);

desc('Pimcore Bundles install');
task(
    'pimcore:bundles:install',
    function () {
        info('Installing Pimcore Bundles');
        upload('scripts/php-cli/install-bundles.sh', '{{release_or_current_path}}/install-bundles.sh');
        run('chmod +x {{release_or_current_path}}/install-bundles.sh');
        within('{{release_or_current_path}}', function () {
            run('{{release_or_current_path}}/install-bundles.sh');
        });
        run('rm {{release_or_current_path}}/install-bundles.sh');
    }
);

desc('Rebuild PHP files for classes, field collections and object bricks');
task(
    'pimcore:classes:build',
    function () {
        info('Rebuild PHP files for classes, field collections and object bricks');
        run('{{bin/console}} pimcore:build:classes');
    }
);

desc('Run app scripts');
task(
    'app:build:commands',
    function () {
        info('Creating default folders');
        run('{{bin/console}} app:build:create-folders');
        info('Creating website settings');
        run('{{bin/console}} app:build:create-website-settings');
    }
);

desc('Create \'html\' symlink if not exists');
task(
    'uberspace:create-html-symlink',
    function () {
        if (test('[ -d {{deploy_path}}/../html ]')) {
            info('Remove existing html folder');
            run('rm -Rf {{deploy_path}}/../html');
        }
        if (test('[ ! -L {{deploy_path}}/../html ]')) {
            info('Creating html symlink to current Pimcore public folder');
            run('ln -s {{deploy_path}}/current/public {{deploy_path}}/../html');
        }
    }
);

/*desc('Sync logrotate configs');
task(
    'logrotate:sync-logfiles',
    function () {
        info('Upload logrotate configs');
        upload('logrotate.{{remote_user}}.conf', '{{deploy_path}}/logrotate.conf');
        info('Sync logrotate configs');
        run('sudo cp {{deploy_path}}/logrotate/* /etc/logrotate.d/');
    }
);
*/

desc('Sync crontab from file');
task(
    'crontab:sync',
    function () {
        info('Upload crontab file');
        upload('crontab', '{{deploy_path}}/crontab');
        info('Sync crontab file');
        run('crontab {{deploy_path}}/crontab');
    }
);

desc('Shows some debug information after successful deployment');
task(
    'deploy:debug-info',
    function () {
        info('### Deployment successful ###');
        info('(Git) Repository....: {{repository}}');
        info('(Git) Branch........: {{branch}}');
        info('APP_ENV.............: ' . run("source {{release_path}}/.env && echo \$APP_ENV"));
        info('APP_DEBUG...........: ' . run("source {{release_path}}/.env && echo \$APP_DEBUG"));
        info('PIMCORE_DEV_MODE....: ' . run("source {{release_path}}/.env && echo \$PIMCORE_DEV_MODE"));
        info('Release path........: {{release_path}}');
        info('### Current quota ###');
        $quota = "\n" . run('du -hs /var/www/virtual/{{remote_user}}/awm-pimcore11/releases /var/www/virtual/{{remote_user}}/awm-pimcore11/shared/public /var/www/virtual/{{remote_user}}/awm-pimcore11/shared/var/log /var/www/virtual/{{remote_user}}/awm-pimcore11/shared/var/versions /var/www/virtual/{{remote_user}}/awm-pimcore11/shared/var/recyclebin 2> /dev/null');
        info($quota);
    }
);

// ### HOOKS ###

before('pimcore:deploy', 'pimcore:install');
after('pimcore:deploy', 'pimcore:bundles:install');
after('pimcore:bundles:install', 'pimcore:classes:build');
after('deploy:symlink', 'app:build:commands');
after('app:build:commands', 'uberspace:create-html-symlink');
after('deploy:success', 'crontab:sync');
after('deploy:success', 'deploy:debug-info');
//after('crontab:sync', 'logrotate:sync-logfiles');
after('deploy:failed', 'deploy:unlock');
