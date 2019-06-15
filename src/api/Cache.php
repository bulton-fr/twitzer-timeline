<?php

namespace Api;

use \BFW\Helpers\Secure;

class Cache extends \BfwApi\Rest
{
    /**
     * Get auth status
     * 
     * {@inheritdoc}
     */
    public function postRequest()
    {
        $id = $this->datas['id'];

        $twitzerInfo = new \Services\TwitzerInfo;
        $status      = $twitzerInfo->updateSinceId($id);

        if ($status === false) {
            http_response_code(403);
            return;
        }

        http_response_code(200);
    }
}
