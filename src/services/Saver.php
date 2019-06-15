<?php

namespace Services;

class Saver
{
    const TWEETS_PATH = APP_DIR.'/cache/tweets/';

    public function write($data)
    {
        return file_put_contents(
            static::TWEETS_PATH.'tweets_'.date('Ymd_His').'.json',
            json_encode($data)
        );
    }

    public function list(): array
    {
        return array_diff(
            scandir(static::TWEETS_PATH),
            ['.', '..', '.gitkeep']
        );
    }

    public function read(string $fileName, $keepJson = false)
    {
        $filePath = static::TWEETS_PATH.$fileName;

        if (file_exists($filePath) === false) {
            throw new \Exception('File not exist.');
        }

        $json = file_get_contents($filePath);

        if ($keepJson === true) {
            return $json;
        }

        return json_decode($json);
    }
}
