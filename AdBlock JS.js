// ==UserScript==
// @name         AdBlock JS
// @namespace    https://github.com/Xdynix/Tampermonkey-Scripts
// @homepage     https://github.com/Xdynix/Tampermonkey-Scripts
// @version      0.1.3
// @description  Custome ad-block using js.
// @author       Xdynix
// @updateURL    https://github.com/Xdynix/Tampermonkey-Scripts/raw/master/AdBlock%20JS.js
// @downloadURL  https://github.com/Xdynix/Tampermonkey-Scripts/raw/master/AdBlock%20JS.js
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const $ = window.jQuery.noConflict(true);
    const url = new URL(window.location.href);

    function loopApplyIfMatch(callback, selector, interval = 100) {
        const loop = setInterval(function() {
            const elements = $(selector);
            if (elements.length) {
                callback(elements, loop);
            }
        }, interval);
    };

    if (url.host === 'tieba.baidu.com') {
        $('.wrap1').css({background: 'initial', 'background-color': '#dceffe'});
    }
    if (url.host.endsWith('wikihow.com')) {
        $('.wh_ad_inner').remove();
    }
    if (url.host === 'www.tsdm.live' && url.pathname.startsWith('/plugin.php')) {
        $('.qdsmile li a').removeAttr('href').removeAttr('target');
    }
    if (url.host === 'www.pixiv.net') {
        $('#js-mount-point-header').removeClass('with-ad');
        $('.ad-footer').remove();
        loopApplyIfMatch(function(elements, loop) {
            elements.each(function() {
                const e = $(this);
                if (e.css('height') === '60px' && e.css('display') === 'flex') {
                    e.css('height', '0px');
                    clearInterval(loop);
                    return false;
                }
            });
        }, 'div:last-child');
    }

    console.log('No way!');
})();
