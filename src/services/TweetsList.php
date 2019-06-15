<?php

namespace Services;

class TweetsList
{
    public function read($username, $sinceId)
    {
        $listTweet = \BFW\Application::getInstance()
            ->getModuleList()
            ->getModuleByName('Twitter')
            ->twitter
                ->setUsername($username)
                ->getTweetSince($sinceId)
        ;
        
        return array_reverse($listTweet);
    }
}
