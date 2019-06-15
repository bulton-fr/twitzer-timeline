<?php

namespace Controllers;

class Save extends \BfwController\Controller
{
    /**
     * @var \Modules\Layout\Layout
     */
    protected $layout;

    /**
     * @var \Services\Saver
     */
    protected $saver;
    
    public function __construct()
    {
        parent::__construct();
        
        $this->layout = $this->app
            ->getModuleList()
            ->getModuleByName('Layout')
            ->layout
        ;

        $this->saver = new \Services\Saver;
    }
    
    public function saveLastTweets()
    {
        $twitzerInfo = new \Services\TwitzerInfo;
        $tweetsList = new \Services\TweetsList;

        $info      = $twitzerInfo->read();
        $newTweets = $tweetsList->read($info->username, $info->sinceId);

        $this->saver->write($newTweets);

        if (empty($newTweets) === false) {
            $lastId = end($newTweets)['id'];
            $twitzerInfo->updateSinceId($lastId);
        }

        echo 'Saved';
    }

    public function list()
    {
        $listFiles    = $this->saver->list();
        $tplListFiles = [];

        foreach ($listFiles as $fileName) {
            $fileKey  = basename($fileName, '.json');
            $tweets   = $this->saver->read($fileName);
            $nbTweets = count($tweets);

            $tplListFiles[$fileKey] = [
                'file'    => $fileName,
                'nbTweet' => $nbTweets
            ];
        }

        $this->layout->addVar('pageName', 'save_list');
        $this->layout->addVar('listFiles', $tplListFiles);
        $this->layout->callLayout('save/list.tpl');
    }

    public function read()
    {
        $fileKey  = \BFW\Helpers\Http::obtainGetKey('file', 'string');
        $fileName = $fileKey.'.json';

        $errorMsg = null;
        $timeline = '[]';

        try {
            $timeline = $this->saver->read($fileName, true);
        } catch (\Exception $e) {
            http_response_code(400);
            $errorMsg = $e->getMessage();
        }

        $this->layout->addVar('pageName', 'save_read');
        $this->layout->addVar('errorMsg', $errorMsg);
        $this->layout->addVar('timeline', $timeline);
        $this->layout->callLayout('save/read.tpl');
    }
}
