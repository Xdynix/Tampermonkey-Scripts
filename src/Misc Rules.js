// ==UserScript==
// @name         Misc Rules
// @namespace    https://github.com/Xdynix/Tampermonkey-Scripts
// @homepage     https://github.com/Xdynix/Tampermonkey-Scripts
// @version      1.1.0
// @description  Misc rules.
// @author       Xdynix
// @updateURL    https://github.com/Xdynix/Tampermonkey-Scripts/raw/master/src/Misc%20Rules.js
// @downloadURL  https://github.com/Xdynix/Tampermonkey-Scripts/raw/master/src/Misc%20Rules.js
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @match        *://*/*
// @grant        none
// ==/UserScript==


(function () {
    'use strict';

    const $ = window.jQuery.noConflict(true);
    const url = new URL(window.location.href);

    if (url.host === 'www.youtube.com') {
        // Disable numpad on YouTube.
        window.addEventListener('keydown', e => {
            if ('0123456789'.includes(e.key) && e.location === KeyboardEvent.DOM_KEY_LOCATION_NUMPAD) {
                e.stopPropagation();
            }
        }, true);
        console.log('Numpad not allowed.');
    }

    if (url.toString().startsWith('https://reg.usps.com/portal/login')) {
        // Enable USPS login autocomplete.
        $('form input[name=username]').attr('autocomplete', 'on');
        console.log('What\'s wrong with you USPS?');
    }

    if (url.host === 'www.bilibili.com') {
        setInterval(() => {
            const searchKeyAllowList = ['p', 't'];
            const url = new URL(window.location.href);
            const urlParams = new URLSearchParams(url.search);

            let searchParamsChanged = false;
            for (const key of Array.from(urlParams.keys())) {
                if (!searchKeyAllowList.includes(key)) {
                    urlParams.delete(key);
                    searchParamsChanged = true;
                }
            }
            if (urlParams.get('p') === '1') {
                urlParams.delete('p');
                searchParamsChanged = true;
            }

            if (searchParamsChanged) {
                url.search = urlParams.toString();
                history.replaceState(null, null, url.toString());
            }
        }, 100);
    }
})();
