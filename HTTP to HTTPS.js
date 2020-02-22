// ==UserScript==
// @name         HTTP to HTTPS
// @version      0.1
// @description  Redirect sites in list.
// @author       kurimuzonkoa
// @match        http://*/*
// @grant        none
// ==/UserScript==

(function() {
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
