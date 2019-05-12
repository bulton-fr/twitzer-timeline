<?php

namespace Api;

use Modules\PubKeyAuth\Validate;

class PubKeyValidate extends \BfwApi\Rest
{
    /**
     * Validate the pubkey
     *
     * {@inheritdoc}
     */
    public function postRequest()
    {
        $pubKey  = trim($this->datas['pubKey']);
        $isValid = Validate::hasKey($pubKey);

        if ($isValid === false) {
            http_response_code(403);
            return;
        }

        http_response_code(200);
    }
}
