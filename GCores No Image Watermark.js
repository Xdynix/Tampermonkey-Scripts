// ==UserScript==
// @name         GCores No Image Watermark
// @namespace    https://github.com/Xdynix/Tampermonkey-Scripts
// @homepage     https://github.com/Xdynix/Tampermonkey-Scripts
// @version      0.3.1
// @description  Remove image watermarks on GCores.
// @author       Xdynix
// @updateURL    https://github.com/Xdynix/Tampermonkey-Scripts/raw/master/GCores%20No%20Image%20Watermark.js
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// @match        https://www.gcores.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const $ = window.jQuery.noConflict(true);

    const imageUrlPatterns = [
        [
            /^https?:\/\/alioss\.gcores\.com.*_watermark(\.\w+)$/i,
            function(url) {
                return url.replace(/_watermark(\.\w+)$/i, '$1');
            }
        ],
        [
            /^https?:\/\/image\.gcores\.com\/.+$/i,
            function(url) {
                url = new URL(url);
                const urlParams = new URLSearchParams(url.search);
                const ossProcess = urlParams.get('x-oss-process');
                if (ossProcess !== null) {
                    const parameters = ossProcess.split('/').filter((param, idx, array) => {
                        if (param === 'content_watermark') return false;
                        if (param.startsWith('watermark')) return false;
                        return true;
                    });
                    urlParams.set('x-oss-process', parameters.join('/'));
                }
                url.search = urlParams.toString();
                return url.toString();
            }
        ]
    ];
    function processElements(elements, attrName) {
        elements.each(function() {
            for (var i = 0; i < imageUrlPatterns.length; ++i) {
                const pattern = imageUrlPatterns[i][0];
                const replace = imageUrlPatterns[i][1];
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

    setInterval(function() {
        processElements($('img'), 'data-original');
        processElements($('img'), 'src');
        processElements($('a'), 'href');
    }, 100);

    console.log('No more water~');
})();
