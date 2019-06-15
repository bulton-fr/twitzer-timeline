<form id="formInfos">
    <div class="mdl-textfield mdl-js-textfield">
        <input
            class="mdl-textfield__input twitzer-header-textfield__input"
            type="text"
            id="twitterUser"
            value="{$infos->username}"
        >
        <label
            class="mdl-textfield__label twitzer-header-textfield__label"
            for="twitterUser"
        >Twitter user</label>
    </div>
    <div class="mdl-textfield mdl-js-textfield">
        <input
            class="mdl-textfield__input twitzer-header-textfield__input"
            type="text"
            id="sinceTweetId"
            value="{$infos->sinceId}"
        >
        <label
            class="mdl-textfield__label twitzer-header-textfield__label"
            for="sinceTweetId"
        >Since tweet id</label>
    </div>
    
    <button
        type="submit"
        id="updateTweetList"
        disabled="disabled"
        class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--colored"
    >
        <i class="material-icons">cached</i>
    </button>
</form>