const app = (function() {
    let pageName,
        page;

    function init() {
        pageName = document.querySelector('.app-js-init').dataset.pageName;

        if (pageName === 'home') {
            initHome();
        } else if (pageName === 'save_list') {
            initSaveList();
        } else if (pageName === 'save_read') {
            initSaveRead();
        }

        if (typeof page !== 'undefined') {
            page.init();
        }
    }

    function initHome() {
        page = home;

        tweets.init();
        tweets.initScroll();
    }

    function initSaveList() {
        //Nothing to init :)
    }

    function initSaveRead() {
        page = saveRead;

        tweets.init();
        tweets.initScroll();
    }
    
    return {
        init,
        getPage: function() {
            return page;
        }
    };
})();
