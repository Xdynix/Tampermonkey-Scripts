// ==UserScript==
// @name         HTTP to HTTPS
// @namespace    https://github.com/Xdynix/Tampermonkey-Scripts
// @homepage     https://github.com/Xdynix/Tampermonkey-Scripts
// @version      0.2.2
// @description  Redirect sites to HTTPS
// @author       Xdynix
// @updateURL    https://github.com/Xdynix/Tampermonkey-Scripts/raw/master/src/http-to-https.user.js
// @downloadURL  https://github.com/Xdynix/Tampermonkey-Scripts/raw/master/src/http-to-https.user.js
// @match        http://bangumi.tv/*
// @match        http://jandan.net/*
// @match        http://meipin.im/*
// @match        http://www.anitama.cn/*
// @match        http://www.chuapp.com/*
// @match        http://www.vgtime.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // noinspection HttpUrlsUsage
    window.location.href = window.location.href.replace('http://', 'https://');
})();
