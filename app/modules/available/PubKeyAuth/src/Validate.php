<?php

namespace Modules\PubKeyAuth;

class Validate
{
    const PUBKEY_DIR = CONFIG_DIR.'PubKeyAuth/keys';

    public static function hasKey($pubKeyToCheck)
    {
        $pubKeyList = array_diff(scandir(static::PUBKEY_DIR), ['.', '..', '.gitkeep']);
        
        foreach ($pubKeyList as $pubKeyFile) {
            $pubKey = trim(file_get_contents(static::PUBKEY_DIR.'/'.$pubKeyFile));

            if ($pubKey === $pubKeyToCheck) {
                return true;
            }
        }

        return false;
    }
}
