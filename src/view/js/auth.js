const auth = (function() {
    let isAuth = false;

    function init() {
        authForm.init();
        authForm.addEventOnFormBtn(validatePubKeyFromPost);

        validatePubKeyFromStorage();
    }

    function validatePubKeyFromPost() {
        let pubKey = authDialog.querySelector('#pubKeyValue').value;
        if (pubKey === '') {
            return;
        }

        let promise = new Promise(function(resolv, reject) {
            validatePubKey(pubKey, resolv, reject);
        });

        promise
            .then(function() {
                authForm.close();
            })
            .catch(function() {
                authForm.setFormError('The pubKey is not allowed.');
            })
        ;
    }

    function validatePubKeyFromStorage() {
        authForm.hideAuthForm();

        let pubKey = localStorage.getItem('pubKey');
        if (pubKey === null) {
            displayAuthByForm();
            return;
        }

        let promise = new Promise(function(resolv, reject) {
            validatePubKey(pubKey, resolv, reject);
        });

        promise
            .then(function() {
                authForm.close();
            })
            .catch(function() {
                displayAuthByForm();
            })
        ;
    }

    function displayAuthByForm() {
        authForm.hideAuthLS();
        authForm.showAuthLSError();
        authForm.showAuthForm();
    }

    function validatePubKey(pubKeyValue, resolv, reject) {
        let url = '/api/pubKeyValidate';
        
        const ajax = new Utils_Ajax(
            url,
            {
                success: function() {
                    pubKeyOk(pubKeyValue);
                    resolv();
                },
                error: reject
            },
            'POST'
        );

        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.setRequestHeader('Accept', 'application/json');
        
        ajax.run(JSON.stringify({
            pubKey: pubKeyValue
        }));
    }

    function pubKeyOk(pubKeyValue) {
        isAuth = true;

        localStorage.setItem("pubKey", pubKeyValue);
        home.enableInterface();
    }
    
    return {
        init,
        getIsAuth: function() {
            return isAuth;
        }
    };
})();
