class Utils_Ajax
{
    /**
     * Constructor
     * 
     * @param {String} url
     * @param {Object} callbacks
     * @param {String} method
     * 
     * @returns {Ajax}
     */
    constructor(url, callbacks, method) {
        this.callbacksLists = callbacks || {};
        this.checkCallback();
        
        this.xhr = null;
        this.initXhr();
        
        var httpMethod = method || 'GET';
        
        this.xhr.open(httpMethod, url, true);
        this.xhr.onreadystatechange = this.callback.bind(this);
    }
    
    /**
     * Check if callbacks is defined and define to an empty callback else
     * 
     * @returns {undefined}
     */
    checkCallback() {
        if (!this.callbacksLists.hasOwnProperty('success')) {
            this.callbacksLists.success = function () {};
        }
        
        if (!this.callbacksLists.hasOwnProperty('error')) {
            this.callbacksLists.error = function () {};
        }
        
        if (!this.callbacksLists.hasOwnProperty('always')) {
            this.callbacksLists.always = function () {};
        }
    }
    
    /**
     * Init the XHR object
     * 
     * @returns {undefined}
     */
    initXhr() {
        if (!(window.XMLHttpRequest || window.ActiveXObject)) {
            throw new Error(
                'Your browser not support XMLHTTPRequest object.'
            );
        }
        
        if (!window.ActiveXObject) {
            this.xhr = new XMLHttpRequest();
            return;
        }
        
        try {
            this.xhr = new ActiveXObject('Msxml2.XMLHTTP');
        } catch(e) {
            this.xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
    }
    
    /**
     * Function called when ajax status change
     * 
     * @returns {undefined}
     */
    callback() {
        if (this.xhr.readyState !== 4) {
            return;
        }
        
        this.callbacksLists.always(this.xhr);
        
        if (this.xhr.status === 200 || this.xhr.status === 0) {
            this.callbacksLists.success(this.xhr);
            return;
        }
        
        this.callbacksLists.error(this.xhr);
    }
    
    /**
     * Run the ajax call
     * 
     * @param {mixed} formDatas
     * 
     * @returns {undefined}
     */
    run(formDatas) {
        this.xhr.send(formDatas);
    }
    
    /**
     * Set a new header for the request
     * 
     * @param {String} headerName
     * @param {String} headerValue
     * 
     * @returns {undefined}
     */
    setRequestHeader(headerName, headerValue) {
        this.xhr.setRequestHeader(headerName, headerValue);
    }
}
