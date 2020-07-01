// ==UserScript==
// @name         Pixiv Tag to Dic
// @namespace    https://github.com/Xdynix/Tampermonkey-Scripts
// @homepage     https://github.com/Xdynix/Tampermonkey-Scripts
// @version      0.2.0
// @description  Add link from Pixiv tag page to dictionary page.
// @author       Xdynix
// @updateURL    https://github.com/Xdynix/Tampermonkey-Scripts/raw/master/src/Pixiv%20Tag%20to%20Dic.js
// @downloadURL  https://github.com/Xdynix/Tampermonkey-Scripts/raw/master/src/Pixiv%20Tag%20to%20Dic.js
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// @match        https://www.pixiv.net/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const $ = window.jQuery.noConflict(true);

    function loopApplyIfMatch(callback, selector, interval = 100) {
        const loop = setInterval(function () {
            const elements = $(selector);
            if (elements.length) {
                callback(elements, loop);
            }
        }, interval);
    }

    setInterval(function () {
        const tagNameMatch = location.pathname.match(/\/tags\/(.+?)\/.+/i);
        if (tagNameMatch !== null && !document.getElementById('dic-button')) {
            const tagName = decodeURIComponent(tagNameMatch[1]);
            loopApplyIfMatch(function (elements, loop) {
                const novelButton = $(elements[0]);
                const dicButton = novelButton.clone();
                dicButton.attr({
                    href: `https://dic.pixiv.net/a/${tagName}`,
                    target: '_blank',
                    id: 'dic-button'
                });
                $(':first-child', dicButton).text('词典');
                dicButton.insertAfter(novelButton);
                clearInterval(loop);
            }, `nav > a:nth-last-child(2)[href^='/tags/${tagName}']`);
        }
    }, 100);
})();
