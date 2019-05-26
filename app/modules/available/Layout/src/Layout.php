<?php

namespace Modules\Layout;

class Layout
{
    /**
     * @var \BFW\Module
     */
    protected $module;
    
    /**
     * @var \Fenom
     */
    protected $fenom;
    
    protected $currentTemplate = '';
    
    protected $cssList = [];
    protected $jsList = [];
    
    protected $vars = [];
    
    public function __construct($module)
    {
        $this->module = $module;
        
        $app         = \BFW\Application::getInstance();
        $this->fenom = $app->getModuleList()->getModuleByName('bfw-fenom')->fenom;
        
        $this->addDefaultVars();
        $this->addDefaultAssets();
    }
    
    public function addCss($cssLink)
    {
        $this->cssList[] = $cssLink;
    }
    
    public function addJs($jsLink)
    {
        $this->jsList[] = $jsLink;
    }
    
    public function addVar($varName, $varValue)
    {
        $this->vars[$varName] = $varValue;
    }
    
    public function addVars($vars)
    {
        if (!is_array($vars)) {
            return;
        }
        
        $this->vars = array_merge($vars, $this->vars);
    }
    
    public function callLayout($bodyTemplate, $vars = [])
    {
        if ($vars !== [] && is_array($vars)) {
            $this->vars = array_merge($vars, $this->vars);
        }
        
        $this->addVar('bodyTemplate', $bodyTemplate);
        $this->addVar('cssListFiles', $this->cssList);
        $this->addVar('jsListFiles', $this->jsList);
        
        $this->fenom->display('structures/layout.tpl', $this->vars);
    }
    
    public function addDefaultVars()
    {
        //@TODO with config file
        
        $bfwRequest = \BFW\Request::getInstance();
        $request    = $bfwRequest->getRequest();
        
        $this->vars = [
            'baseUrl'      => $request->scheme.'://'.$request->host,
            'useAdmLayout' => false
        ];
    }
    
    public function addDefaultAssets()
    {
        $config = $this->module->getConfig();
        
        $css = $config->getValue('css', 'assets.php');
        $js  = $config->getValue('js', 'assets.php');
        
        foreach ($css as $cssFile) {
            $this->addCss($cssFile);
        }
        foreach ($js as $jsFile) {
            $this->addJs($jsFile);
        }
    }
}
