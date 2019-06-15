const authForm = (function() {
    let authDialog,
        authLocalStorage,
        authLocalStorageError,
        authForm,
        authFormError,
        validateBtn
    ;

    function init() {
        authDialog            = document.querySelector('#authDialog');
        authLocalStorage      = authDialog.querySelector('#authLocalStorage');
        authLocalStorageError = authDialog.querySelector('#authLocalStorageError');
        authForm              = authDialog.querySelector('#authForm');
        authFormError         = authDialog.querySelector('#authFormError');
        validateBtn           = authDialog.querySelector('#authValidate');

        if (authDialog.showModal === false) {
            dialogPolyfill.registerDialog(authDialog);
        }

        authDialog.showModal();
    }

    function close() {
        authDialog.close();
    }

    function addEventOnFormBtn(callback) {
        validateBtn.addEventListener('click', callback);
    }

    function hideAuthForm() {
        let formClassList = authForm.classList,
            btnClassList  = validateBtn.classList
        ;

        if (formClassList.contains('hidden') === false) {
            formClassList.add('hidden');
        }

        if (btnClassList.contains('hidden') === false) {
            btnClassList.add('hidden');
        }
    }

    function showAuthForm() {
        let formClassList = authForm.classList,
            btnClassList  = validateBtn.classList
        ;

        if (formClassList.contains('hidden') === true) {
            formClassList.remove('hidden');
        }

        if (btnClassList.contains('hidden') === true) {
            btnClassList.remove('hidden');
        }
    }

    function hideAuthLS() {
        let authLSClassList = authLocalStorage.classList;

        if (authLSClassList.contains('hidden') === false) {
            authLSClassList.add('hidden');
        }
    }

    function showAuthLS() {
        let authLSClassList = authLocalStorage.classList;

        if (authLSClassList.contains('hidden') === true) {
            authLSClassList.remove('hidden');
        }
    }

    function showAuthLSError() {
        let authLSErrorClassList = authLocalStorageError.classList;

        if (authLSErrorClassList.contains('hidden') === true) {
            authLSErrorClassList.remove('hidden');
        }
    }

    function setFormError(msg)
    {
        authFormError.innerHTML = msg;
    }
    
    return {
        init,
        close,
        addEventOnFormBtn,
        hideAuthForm,
        showAuthForm,
        hideAuthLS,
        showAuthLS,
        showAuthLSError,
        setFormError
    };
})();