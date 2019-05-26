# Twitter cleaned timeline

It's an interface without :

* sponsored tweet
* liked by
* user you followed follow him
* maybe you have missed

The interface kept where you are into your reading, and display tweet from the last you have read... In a limit of 200 tweet.

It's protected by a system who ask you a key (saved in localstorage to not ask it each time).

## Configuration

### Application

It's a [bfw](https://www.github.com/bfw-systems/bfw) application, so all config files are into `/app/configs`.

You need to configure twitter tokens into `/app/configs/Twitter/config.php`.  
And you need to add your public key into `/app/config/PubKeyAuth/keys/`.
The file can have the name you want, all public keys are readed during authentification.

If you don't want rewrite the twitter username, you need to add it to `/app/cache/twitzer.json`.
This is a change I need to do some day.

### Docker

There are a `.env.default` used by docker-compose.
Rename it to `.env` and change values :

* `EXTERNAL_PORT` : External port used to forward the port 80.
* `SSL_CERTS_PATH` : If you use https, the path (on the host) to the file used by https (`cert.pem`, `privkey.pem`, `chain.pem`).

## Installation

Just git clone the repository, and exec `docker-compose up -d`.  
If you want have a https for the application, use `docker-compose -f docker-compose.yml -f docker-compose.https.yml up -d`.

## Use the application

In the top-right, you have many fields.

* Twitter user : The user for whom the timeline will be displayed
* Since tweet id : The id of the last tweet see (not updated automatically)
* A figgerprint button : open the popup to display the form who asked the pubkey for authentification
* A reload button : To display last tweet from the since id

Below the header, all tweet find will be displayed by the twitter official widget.
A bookmark button is added in the top-right corner of each tweet. Click on it will update the last since id value.

And it's all
