const home = (function() {
    let formInfos,
        inputUsername,
        inputSinceId
    ;

    function init() {
        formInfos     = document.querySelector("#formInfos");
        inputUsername = document.querySelector("#twitterUser");
        inputSinceId  = document.querySelector("#sinceTweetId");
        
        document.querySelector('.mdl-layout__content').addEventListener('scroll', function(e) {
            fillAllTweets();
        });
        
        formInfos.addEventListener('submit', formSubmit);
    }

    function enableInterface() {
        document.querySelector('#updateTweetList').removeAttribute('disabled');
    }
    
    function formSubmit(event) {
        event.preventDefault();
        
        if (auth.getIsAuth() === false) {
            return;
        }

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
        let json = JSON.parse(xhr.response);

        tweets.setAddMark(true);
        tweets.addFromJSON(json);
    }

    function getTweetFail() {
        alert('An error as occured.');
    }
    
    return {
        init,
        enableInterface
    };
})();
