// ==UserScript==
// @name         NGA Host Normalize
// @namespace    https://github.com/Xdynix/Tampermonkey-Scripts
// @homepage     https://github.com/Xdynix/Tampermonkey-Scripts
// @version      1.0.0
// @description  Redirect sites to HTTPS
// @author       Xdynix
// @updateURL    https://github.com/Xdynix/Tampermonkey-Scripts/raw/master/src/nga-host-normalize.user.js
// @downloadURL  https://github.com/Xdynix/Tampermonkey-Scripts/raw/master/src/nga-host-normalize.user.js
// @match        https://nga.178.com/*
// @match        https://ngabbs.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const url = new URL(window.location.href);
    const urlParams = new URLSearchParams(url.search);
    url.host = 'bbs.nga.cn';
    urlParams.delete('rand');
    url.search = urlParams.toString();
    window.location.href = url.toString();
})();
