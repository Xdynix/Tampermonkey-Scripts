// ==UserScript==
// @name         Jandan Pic Open in Edge
// @namespace    https://github.com/Xdynix/Tampermonkey-Scripts
// @homepage     https://github.com/Xdynix/Tampermonkey-Scripts
// @version      0.2.2
// @description  Enable open Jandan Pic in Edge, which is easier to copy gif.
// @author       Xdynix
// @updateURL    https://github.com/Xdynix/Tampermonkey-Scripts/raw/master/Jandan%20Pic%20Open%20in%20Edge.js
// @downloadURL  https://github.com/Xdynix/Tampermonkey-Scripts/raw/master/Jandan%20Pic%20Open%20in%20Edge.js
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// @match        https://jandan.net/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const $ = window.jQuery.noConflict(true);
    const protocol = window.location.protocol;
    $('a.view_img_link').each(function () {
        let url = this.href;
        if (!/^https?:\/\//i.test(url)) {
            url = protocol + url;
        }
        $(this).after('<a href="microsoft-edge:https://ezgif.com/optimize?url=' + url + '" class="view_img_link">[在Edge优化]</a>');
        $(this).after('<a href="microsoft-edge:' + url + '" class="view_img_link">[在Edge打开]</a>');
    });
    console.log('OOXX');
})();
