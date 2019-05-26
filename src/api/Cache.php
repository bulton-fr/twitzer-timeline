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
        
        $json = json_decode(file_get_contents(APP_DIR.'/cache/twitzer.json'));
        $json->sinceId = $id;
        
        file_put_contents(
            APP_DIR.'/cache/twitzer.json',
            json_encode($json)
        );
    }
}
