<?php

namespace Controllers;

class Home extends \BfwController\Controller
{
    /**
     * @var \Modules\Layout\Layout
     */
    protected $layout;
    
    public function __construct()
    {
        parent::__construct();
        
        $this->layout = $this->app
            ->getModuleList()
            ->getModuleByName('Layout')
            ->layout
        ;
    }
    
    public function index()
    {
        $twitzerInfo = new \Services\TwitzerInfo;
        $this->layout->addVar('infos', $twitzerInfo->read());
        $this->layout->addVar('headerRight', 'home/form-header.tpl');
        $this->layout->addVar('pageName', 'home');
        
        $this->layout->callLayout('home/index.tpl');
    }
}
