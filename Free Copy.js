// ==UserScript==
// @name         Free Copy
// @namespace    https://github.com/Xdynix/Tampermonkey-Scripts
// @homepage     https://github.com/Xdynix/Tampermonkey-Scripts
// @version      0.1.4
// @description  Enable copying on some sites.
// @author       Xdynix
// @updateURL    https://github.com/Xdynix/Tampermonkey-Scripts/raw/master/Free%20Copy.js
// @downloadURL  https://github.com/Xdynix/Tampermonkey-Scripts/raw/master/Free%20Copy.js
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const $ = window.jQuery.noConflict(true);
    const url = new URL(window.location.href);

    function onCopy(e) {
        e.preventDefault();
        const clipboardData = window.clipboardData || e.originalEvent.clipboardData;
        clipboardData.setData('text/plain', document.getSelection().toString());
    }

    if (url.host === 'pad.skyozora.com' && url.pathname.startsWith('/news')) {
        $('*')
            .css('user-select', 'auto')
            .css('-ms-user-select', 'auto')
            .css('-moz-user-select', 'auto')
            .css('-khtml-user-select', 'auto')
            .css('-webkit-user-select', 'auto')
            .css('-webkit-touch-callout', 'default');
    }
    if (url.host === 'www.anitama.cn') {
        $('#area-content-article').on('copy', onCopy);
    }
    if (url.host === 'www.bilibili.com' && url.pathname.startsWith('/read')) {
        setTimeout(function () {
            $(document).on('copy', onCopy);
            $('.article-holder').on('copy', onCopy);
            $('.unable-reprint').css('user-select', 'text');
        }, 1000);
    }
    if (url.host === 'www.zhihu.com') {
        $(document).on('copy', onCopy);
    }

    console.log("Freedom!!!");
})();
