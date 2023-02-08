<?php
namespace Deployer;

require 'recipe/symfony.php';

// Config

set('repository', '');

add('shared_files', []);
add('shared_dirs', []);
add('writable_dirs', []);

// Hosts

host('www.definitive.quantic-technologies.net')
    ->set('remote_user', 'deployer')
    ->set('deploy_path', '~/quantic-staking');
host(' definitive.quantic-technologies.net')
    ->set('remote_user', 'deployer')
    ->set('deploy_path', '~/quantic-staking');
host(' www.quantic-technologies.net')
    ->set('remote_user', 'deployer')
    ->set('deploy_path', '~/quantic-staking');
host(' quantic-technologies.net')
    ->set('remote_user', 'deployer')
    ->set('deploy_path', '~/quantic-staking');

// Hooks

after('deploy:failed', 'deploy:unlock');
