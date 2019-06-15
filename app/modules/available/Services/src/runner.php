<?php

\BFW\Helpers\Constants::create('SERVICES_DIR', SRC_DIR.'services/');
\BFW\Application::getInstance()
    ->getComposerLoader()
    ->addPsr4('Services\\', SERVICES_DIR)
;
