// ==UserScript==
// @name         HTTP to HTTPS
// @namespace    https://github.com/Xdynix/Tampermonkey-Scripts
// @homepage     https://github.com/Xdynix/Tampermonkey-Scripts
// @version      0.1.2
// @description  Redirect sites in list.
// @author       Xdynix
// @updateURL    https://github.com/Xdynix/Tampermonkey-Scripts/raw/master/HTTP%20to%20HTTPS.js
// @downloadURL  https://github.com/Xdynix/Tampermonkey-Scripts/raw/master/HTTP%20to%20HTTPS.js
// @match        http://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const hostList = [
        'jandan.net',
        'www.vgtime.com',
        'www.chuapp.com',
        'meipin.im',
        'www.anitama.cn'
    ];
    const url = new URL(window.location.href);
    if (hostList.indexOf(url.host) >= 0) {
        window.location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
    }
})();
