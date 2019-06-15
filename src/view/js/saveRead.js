const saveRead = (function() {
    function init() {
        tweets.setAddMark(false);
        tweets.addFromJSON(readedTimeline);
    }

    function enableInterface() {
        //Nothing to enable
    }
    
    return {
        init,
        enableInterface
    };
})();
