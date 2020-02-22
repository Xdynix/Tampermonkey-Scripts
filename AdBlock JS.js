// ==UserScript==
// @name         AdBlock JS
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// @version      0.1.1
// @description  Custome ad-block using js.
// @author       kurimuzonkoa
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
