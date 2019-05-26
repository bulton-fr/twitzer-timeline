<?php

//Script played into BFW\Install\ModuleManager\Module::runInstallScript()

function execAction(string $itemToCreate, callable $action): bool
{
    if (file_exists($itemToCreate) === true) {
        echo "\033[1;33mAlready exist.\033[0m\n";
        return true;
    }
    
    if ($action($itemToCreate)) {
        echo "\033[1;32mCreated.\033[0m\n";
        return true;
    }
    
    trigger_error(
        'Module '.$this->name.' install error : Fail to create '.$itemToCreate,
        E_USER_WARNING
    );

    echo "\033[1;31mFail.\033[0m\n";
    return false;
}

echo "\n".' >> Create app/config/'.$this->name.' directory ... ';
$actionStatus = execAction(
    $this->configPath,
    function (string $itemToCreate) {
        return mkdir($itemToCreate, 0775);
    }
);

if ($actionStatus === false) {
    return;
}

echo "\n".' >> Create app/config/'.$this->name.'/keys directory ... ';
$actionStatus = execAction(
    $this->configPath.'/keys',
    function (string $itemToCreate) {
        return mkdir($itemToCreate, 0775);
    }
);

if ($actionStatus === false) {
    return;
}

echo "\n".' >> Create app/config/'.$this->name.'/keys/.gitkeep file ... ';
$actionStatus = execAction(
    $this->configPath.'/keys',
    function (string $itemToCreate) {
        return file_put_contents($itemToCreate, '');
    }
);

if ($actionStatus === false) {
    return;
}
