const app = (function() {
    let pageName;

    function init() {
        pageName = document.querySelector('.app-js-init').dataset.pageName;

        if (pageName === 'home') {
            tweets.init();
            home.init();
        }
    }
    
    return {
        init
    };
})();
