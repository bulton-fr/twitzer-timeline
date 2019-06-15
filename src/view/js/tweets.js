const tweets = (function() {
    let listTweet,
        addMark = false
    ;

    function init() {
        listTweet = document.querySelector("#listTweet");
        
        document.querySelector('.mdl-layout__content').addEventListener('scroll', function(e) {
            fillAllTweets();
        });
    }

    function initScroll() {
        document.querySelector('.mdl-layout__content').addEventListener('scroll', function(e) {
            fillAllTweets();
        });
    }

    function setAddMark(value) {
        addMark = value;
    }

    function addFromJSON(json) {
        listTweet.innerHTML = '';
        
        let nbTweet = json.length,
            tweetIndex;

        for (tweetIndex=0; tweetIndex <= nbTweet; tweetIndex++) {
            addTweet(json[tweetIndex]);
        }
        
        addMarkEvent();
        fillAllTweets();
    }

    function addMarkEvent() {
        if (addMark !== true) {
            return;
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
                    +addMarkBtn(tweetInfos)
                    +addRTBy(tweetInfos)
                    +'<div class="twitzer__card__content"></div>'
                +'</div>'
            +'</div>'
        ;
        
        listTweet.innerHTML += html;
    }

    function addRTBy(tweetInfos) {
        if (typeof tweetInfos.retweeted_status === 'undefined') {
            return '';
        }

        return ''
            +'<div class="twitzer__card__rt-by">'
                +'<p>RT by @'+tweetInfos.user.screen_name+'</p>'
            +'</div>'
        ;
    }

    function addMarkBtn(tweetInfos) {
        if (addMark !== true) {
            return '';
        }

        return ''
            +'<div class="twitzer__card__btn">'
                +'<button'
                    +' type="button"'
                    +' class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--colored twitzer-js__card__btn__mark"'
                    +' data-id="'+tweetInfos.id_str+'"'
                +'>'
                    +'<i class="material-icons">bookmark</i>'
                +'</button>'
            +'</div>'
        ;
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

    function markTweet() {
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
        init,
        initScroll,
        setAddMark,
        addFromJSON
    };
})();
