const app = (function() {
    let formInfos,
        inputUsername,
        inputSinceId,
        listTweet,
        isAuth = false,
        authDialog;
    
    function init() {
        formInfos     = document.querySelector("#formInfos");
        inputUsername = document.querySelector("#twitterUser");
        inputSinceId  = document.querySelector("#sinceTweetId");
        authDialog    = document.querySelector('#authDialog')
        listTweet     = document.querySelector("#listTweet");
        
        document.querySelector('.mdl-layout__content').addEventListener('scroll', function(e) {
            fillAllTweets();
        });
        
        formInfos.addEventListener('submit', formSubmit);

        initAuthDialog();
        validatePubKeyFromStorage();
    }

    function initAuthDialog() {
        let authBtn = document.querySelector('#openAuthDialog');

        if (authDialog.showModal === false) {
            dialogPolyfill.registerDialog(authDialog);
        }
        
        authBtn.addEventListener('click', openAuthDialog);
        authDialog.querySelector('#authValidate').addEventListener('click', validatePubKeyFromPost);
    }

    function openAuthDialog() {
        authDialog.showModal();
    }

    function validatePubKeyFromPost() {
        let pubKey = authDialog.querySelector('#pubKeyValue').value;
        if (pubKey === '') {
            return;
        }

        validatePubKey(pubKey);
    }

    function validatePubKeyFromStorage() {
        let pubKey = localStorage.getItem('pubKey');
        if (pubKey === null) {
            return;
        }

        validatePubKey(pubKey);
    }

    function validatePubKey(pubKeyValue) {
        let url = '/api/pubKeyValidate';
        
        const ajax = new Utils_Ajax(
            url,
            {
                success: function(xhr) {
                    pubKeyValidate(xhr, pubKeyValue);
                },
                error: pubKeyError
            },
            'POST'
        );

        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.setRequestHeader('Accept', 'application/json');
        
        ajax.run(JSON.stringify({
            pubKey: pubKeyValue
        }));
    }

    function pubKeyValidate(xhr, pubKeyValue) {
        isAuth = true;

        localStorage.setItem("pubKey", pubKeyValue);

        document.querySelector('#updateTweetList').removeAttribute('disabled');
        document.querySelector('#openAuthDialog').setAttribute('disabled', 'disabled');

        authDialog.close();
    }

    function pubKeyError(xhr) {
        document.querySelector('#authError').innerHTML = 'The pubKey is not allowed.';
    }
    
    function formSubmit(event) {
        event.preventDefault();
        
        let url = '/api/tweet-list'
            +'/'+inputUsername.value
            +'/'+inputSinceId.value;
        
        const ajax = new Utils_Ajax(
            url,
            {
                success: getTweetDone,
                error: getTweetFail
            },
            'GET'
        );

        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.setRequestHeader('Accept', 'application/json');
        
        ajax.run();
    }
    
    function getTweetDone(xhr) {
        listTweet.innerHTML = '';
        
        let json    = JSON.parse(xhr.response),
            nbTweet = json.length,
            tweetIndex;

        for (tweetIndex=0; tweetIndex <= nbTweet; tweetIndex++) {
            addTweet(json[tweetIndex]);
        }
        
        let allBtn = listTweet.querySelectorAll('.twitzer-js__card__btn__mark'),
            nbBtn  = allBtn.length,
            btnIndex;
        
        for (btnIndex=0; btnIndex <= nbBtn; btnIndex++) {
            if (!allBtn[btnIndex]) {
                continue;
            }
            
            allBtn[btnIndex].addEventListener(
                'click',
                markTweet
            );
        }
        
        fillAllTweets();
    }
    
    function getTweetFail() {
        alert('An error as occured.');
    }
    
    function addTweet(tweetInfos) {
        if (tweetInfos === undefined) {
            return;
        }
        
        let html = ''
            +'<div'
                +' class="mdl-cell mdl-cell--3-col"'
                +' data-id="'+tweetInfos.id_str+'"'
                +' data-user="'+tweetInfos.user.screen_name+'"'
                +' data-filled="false"'
            +'>'
                +'<div class="mdl-card mdl-shadow--2dp twitzer__card twitzer__card--empty">'
                    +'<div class="twitzer__card__btn">'
                        +'<button'
                            +' type="button"'
                            +' class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--colored twitzer-js__card__btn__mark"'
                            +' data-id="'+tweetInfos.id_str+'"'
                        +'>'
                            +'<i class="material-icons">bookmark</i>'
                        +'</button>'
                    +'</div>'
                    +'<div class="twitzer__card__content"></div>'
                +'</div>'
            +'</div>'
        ;
        
        listTweet.innerHTML += html;
    }
    
    function fillAllTweets() {
        let list      = document.querySelector('#listTweet'),
            listTweet = document.querySelectorAll('#listTweet > div'),
            nbTweet   = listTweet.length,
            tweetIndex,
            rectList,
            rectTweet;

        for (tweetIndex=0; tweetIndex < nbTweet; tweetIndex++) {
            rectList  = list.getBoundingClientRect();
            rectTweet = listTweet[tweetIndex].getBoundingClientRect();

            if (rectTweet.top < window.innerHeight && rectTweet.top > 0) {
                if (listTweet[tweetIndex].dataset.filled === "true") {
                    continue;
                }
                
                listTweet[tweetIndex].dataset.filled = "true";
                
                (function(tweetInfos) {
                    twttr.widgets.createTweet(
                        tweetInfos.dataset.id,
                        tweetInfos.querySelector('.mdl-card .twitzer__card__content'),
                        {}
                    )
                    .then(function() {
                        let tweetVisible = tweetInfos
                                .querySelector('.mdl-card .twitzer__card__content twitter-widget')
                                .style
                                .visibility
                        ;
                        
                        if (tweetVisible === 'hidden') {
                            addTweetLink(tweetInfos);
                        }
                    })
                    .catch(function() {
                        addTweetLink(tweetInfos);
                    });
                })(listTweet[tweetIndex]);
            }
        }
    }
    
    function addTweetLink(tweetInfos) {
        let url = 'https://twitter.com/'
            +tweetInfos.dataset.user
            +'/status/'
            +tweetInfos.dataset.id;
    
        tweetInfos.querySelector('.mdl-card .twitzer__card__content').innerHTML = '<a href="'+url+'">'+url+'</a>';
    }
    
    function markTweet()
    {
        let id = this.dataset.id;
        
        const ajax = new Utils_Ajax(
            '/api/cache',
            {
                success: function() {
                    document.querySelector('#sinceTweetId').value = id;
                }
            },
            'POST'
        );

        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.setRequestHeader('Accept', 'application/json');
        
        ajax.run(JSON.stringify({
            id: id
        }));
    }
    
    return {
        init
    };
})();