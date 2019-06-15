<div class="mdl-layout mdl-js-layout app-js-init" data-page-name="{$pageName}">
    <header class="mdl-layout__header twitzer-header">
        <div class="mdl-layout__header-row">
            <span class="mdl-layout-title">Twitzer</span>
            <div class="mdl-layout-spacer"></div>
            
            {if $headerRight !== null}
                {include $headerRight}
            {/if}
        </div>
    </header>
    
    <main class="mdl-layout__content">
        <div class="mdl-grid">