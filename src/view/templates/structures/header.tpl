<div class="mdl-layout mdl-js-layout">
    <header class="mdl-layout__header twitzer-header">
        <div class="mdl-layout__header-row">
            <span class="mdl-layout-title">Twitzer</span>
            <div class="mdl-layout-spacer"></div>
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
                    class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--colored"
                >
                    <i class="material-icons">cached</i>
                </button>
            </form>
        </div>
    </header>
    
    <main class="mdl-layout__content">
        <div class="mdl-grid">