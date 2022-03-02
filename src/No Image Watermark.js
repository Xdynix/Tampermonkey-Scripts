// ==UserScript==
// @name         No Image Watermark
// @namespace    https://github.com/Xdynix/Tampermonkey-Scripts
// @homepage     https://github.com/Xdynix/Tampermonkey-Scripts
// @version      0.0.2
// @description  Remove image watermarks.
// @author       Xdynix
// @updateURL    https://github.com/Xdynix/Tampermonkey-Scripts/raw/master/src/No%20Image%20Watermark.js
// @downloadURL  https://github.com/Xdynix/Tampermonkey-Scripts/raw/master/src/No%20Image%20Watermark.js
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @match        https://www.gcores.com/*
// @match        https://www.yystv.cn/*
// @grant        none
// ==/UserScript==


(function () {
    'use strict';

    const $ = window.jQuery.noConflict(true);
    const url = new URL(window.location.href);

    function processElements(elements, attrName, patterns) {
        elements.each(function () {
            for (let i = 0; i < patterns.length; ++i) {
                const pattern = patterns[i][0];
                const replace = patterns[i][1];
                const oldUrl = this.getAttribute(attrName);
                if (pattern.test(oldUrl)) {
                    const newUrl = replace(oldUrl);
                    if (newUrl !== oldUrl) {
                        this.setAttribute(attrName, newUrl);
                    }
                    break;
                }
            }
        });
    }

    if (url.host === 'www.gcores.com') {
        const gcoresImageUrlPatterns = [
            [
                /^https?:\/\/alioss\.gcores\.com.*_watermark(\.\w+)$/i,
                function (url) {
                    return url.replace(/_watermark(\.\w+)$/i, '$1');
                }
            ],
            [
                /^https?:\/\/image\.gcores\.com\/.+$/i,
                function (url) {
                    url = new URL(url);
                    const urlParams = new URLSearchParams(url.search);
                    const ossProcess = urlParams.get('x-oss-process');
                    if (ossProcess !== null) {
                        const parameters = ossProcess.split('/').filter((param) => {
                            if (param === 'content_watermark') return false;
                            if (param.startsWith('watermark')) return false;
                            return 1;
                        });
                        urlParams.set('x-oss-process', parameters.join('/'));
                    }
                    url.search = urlParams.toString();
                    return url.toString();
                }
            ]
        ];
        setInterval(function () {
            const img = $('img');
            processElements(img, 'data-original', gcoresImageUrlPatterns);
            processElements(img, 'src', gcoresImageUrlPatterns);
            processElements($('a'), 'href', gcoresImageUrlPatterns);
        }, 100);
    }
    if (url.host === 'www.yystv.cn') {
        const yysImageUrlPatterns = [
            [
                /^https?:\/\/alioss\.yystv\.cn.*_mw680water$/i,
                function (url) {
                    return url.replace(/_mw680water$/i, '');
                }
            ]
        ];
        const img = $('img');
        processElements(img, 'data-original', yysImageUrlPatterns);
        processElements(img, 'src', yysImageUrlPatterns);
    }

    console.log('No more water~');
})();
