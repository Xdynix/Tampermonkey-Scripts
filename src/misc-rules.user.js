// ==UserScript==
// @name         Misc Rules
// @namespace    https://github.com/Xdynix/Tampermonkey-Scripts
// @homepage     https://github.com/Xdynix/Tampermonkey-Scripts
// @version      1.2.5
// @description  Misc rules.
// @author       Xdynix
// @updateURL    https://github.com/Xdynix/Tampermonkey-Scripts/raw/master/src/misc-rules.user.js
// @downloadURL  https://github.com/Xdynix/Tampermonkey-Scripts/raw/master/src/misc-rules.user.js
// @require      https://code.jquery.com/jquery-4.0.0-beta.min.js
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

    if (url.toString().startsWith('https://login.irvinecompany.com/login')) {
        // Enable Irvine login autocomplete.
        $('input[name=email]').attr('autocomplete', 'on');
        console.log('What\'s wrong with you Irvine?');
    }

    if (url.host === 'www.bilibili.com') {
        // Normalize URL
        setInterval(() => {
            const searchKeyAllowList = ['p', 't', 'bvid'];
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

        // Remove search link in comments
        setInterval(() => {
            $('span.reply-content > a.jump-link.search-word').replaceWith(function () {
                return $(this).text();
            });
            $('span.reply-content > i.icon.search-word').remove();
        }, 100);
    }

    if (url.host === 'www.vgtime.com') {
        // Modify styles
        $('html > head').append($('<style>.show_big_album_img_arrow { width: 30% !important; }</style>'));
    }

    // Disable Bilibili external player autoplay
    setInterval(() => {
        const players = $('iframe[src*="player.bilibili.com"]');
        players.each(function () {
            const srcUrl = new URL(this.src);
            const srcUrlParams = new URLSearchParams(srcUrl.search);
            if (srcUrlParams.get('autoplay') !== '0') {
                srcUrlParams.set('autoplay', '0');
                srcUrl.search = srcUrlParams.toString();
                this.src = srcUrl.toString();
                console.log('You shall not pass!');
            }
        });
    }, 100);
})();
