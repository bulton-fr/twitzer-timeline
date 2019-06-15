<dialog class="mdl-dialog twitzer-dialog" id="authDialog">
    <h4 class="mdl-dialog__title">PubKey check</h4>
    <div class="mdl-dialog__content">
        <div class="auth__local-storage" id="authLocalStorage">
            <p>Auth by localStorage</p>
            <div class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
        </div>
        <div class="auth__local-storage-error hidden" id="authLocalStorageError">
            <p>The auth by localStorage has failed. Please use the form.</p>
        </div>
        <div class="auth__form" id="authForm">
            <p>Pleaser enter your public key to be sure you're allowed to use the application</p>
            <p id="authFormError" class="mdl-color-text--red-800"></p>
            <textarea id="pubKeyValue" class="twitzer-dialog__pubkey-value"></textarea>
        </div>
    </div>
    <div class="mdl-dialog__actions">
        <button type="button" class="mdl-button" id="authValidate">Validate</button>
    </div>
</dialog>