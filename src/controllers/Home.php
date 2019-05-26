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
        $twitzerInfos = $this->readCacheInfos();
        $this->layout->addVar('infos', $twitzerInfos);
        
        $this->layout->callLayout('index.tpl');
    }
    
    protected function readCacheInfos()
    {
        $obj = (object) [
            'username' => '',
            'sinceId'  => ''
        ];
        
        if (!file_exists(APP_DIR.'cache/twitzer.json')) {
            return $obj;
        }
        
        $json = json_decode(file_get_contents(APP_DIR.'cache/twitzer.json'));
        
        if (property_exists($json, 'username')) {
            $obj->username = $json->username;
        }
        if (property_exists($json, 'sinceId')) {
            $obj->sinceId = $json->sinceId;
        }
        
        return $obj;
    }
}
