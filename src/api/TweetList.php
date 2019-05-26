<?php

namespace Api;

use \BFW\Helpers\Http;

class TweetList extends \BfwApi\Rest
{
    /**
     * Get auth status
     * 
     * {@inheritdoc}
     */
    public function getRequest()
    {
        try {
            $username = Http::obtainGetKey('username', 'string');
            $sinceId  = Http::obtainGetKey('sinceId', 'string');
        } catch (\Exception $ex) {
            http_response_code(400);
            return false;
        }
        
        $app       = \BFW\Application::getInstance();
        $listTweet = $app->getModuleList()->getModuleByName('Twitter')->twitter
            ->setUsername($username)
            ->getTweetSince($sinceId);
        
        $responseTweet = array_reverse($listTweet);
        $this->sendResponse($responseTweet);
    }
}
