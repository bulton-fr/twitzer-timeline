<?php

namespace Services;

class TwitzerInfo
{
    const FILE_PATH = APP_DIR.'/cache/twitzer.json';

    public function read()
    {
        $obj = (object) [
            'username' => '',
            'sinceId'  => ''
        ];
        
        if (!file_exists(static::FILE_PATH)) {
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

    public function write($info)
    {
        return file_put_contents(static::FILE_PATH, json_encode($info));
    }

    public function updateSinceId($sinceId)
    {
        $info = $this->read();
        $info->sinceId = $sinceId;
        
        return $this->write($info);
    }
}
