<?php

namespace Modules\Twitter;

use \Exception;

class Timeline
{
    protected $module;
    protected $auth;
    
    protected $username;
    
    public function __construct(\BFW\Module $module)
    {
        $this->module = $module;
    }
    
    public function setUsername($username)
    {
        $this->username = $username;
        return $this;
    }
    
    protected function createAuth()
    {
        if ($this->auth !== null) {
            return;
        }
        
        $config = $this->module->getConfig();
        $this->auth = new \TwitterOAuth\Auth\SingleUserAuth(
            [
                'consumer_key'       => $config->getValue('consumer')->key,
                'consumer_secret'    => $config->getValue('consumer')->secret,
                'oauth_token'        => $config->getValue('oauth')->token,
                'oauth_token_secret' => $config->getValue('oauth')->secret,
            ],
            new \TwitterOAuth\Serializer\ArraySerializer()
        );
    }
    
    public function getTweetSince($sinceId)
    {
        $this->createAuth();
        
        $timelineParams = [
            'screen_name' => $this->username,
            'count'       => 200,
            'since_id'    => $sinceId
        ];
        
        $timeline = $this->auth->get(
            'statuses/home_timeline',
            $timelineParams
        );
        
        $headers = $this->auth->getHeaders();
        if (trim($headers['status']) !== '200 OK') {
            throw new Exception('Twitter API response '.$headers['status']);
        }
        
        return $timeline;
    }
    
    public function getHtmlBlocForId($username, $id)
    {
        $tweetUrl = 'https://twitter.com/'.$username.'/status/'.$id;
        $url      = 'https://publish.twitter.com/oembed'
            .'?url='.urlencode($tweetUrl)
            .'&omit_script=true'
            .'&hide_media=false';
        
        $jsonParser = new \bultonFr\CallCurl\Parser\Json;
        $curl       = new \bultonFr\CallCurl\CallCurl($jsonParser, $jsonParser);
        $curl->setUrl($url);
        
        try {
            $dataReceive = $curl->runCall();
            $dataHeaders = $curl->getCurlCallInfos();
        } catch (\Exception $e) {
            return '<blockquote class="twitter-tweet"><p lang="en" dir="ltr"><a href="'.$tweetUrl.'">'.$tweetUrl.'</a></p></blockquote>';
        }
        
        if ($dataHeaders['http_code'] !== 200) {
            return '<blockquote class="twitter-tweet"><p lang="en" dir="ltr"><a href="'.$tweetUrl.'">'.$tweetUrl.'</a></p></blockquote>';
        }
        
        return $dataReceive->html;
    }
}
