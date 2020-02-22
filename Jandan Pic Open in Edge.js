// ==UserScript==
// @name         Jandan Pic Open in Edge
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// @version      0.2
// @description  Enable open Jandan Pic in Edge, whicn is easier to copy gif.
// @author       kurimuzonkoa
// @match        https://jandan.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const $ = window.jQuery.noConflict(true);
    const protocol = window.location.protocol;
    $('a.view_img_link').each(function() {
        var url = this.href;
        if (!/^https?:\/\//i.test(url)) {
            url = protocol + url;
        }
        $(this).after('<a href="microsoft-edge:https://ezgif.com/optimize?url=' + url + '" class="view_img_link">[在Edge优化]</a>');
        $(this).after('<a href="microsoft-edge:' + url + '" class="view_img_link">[在Edge打开]</a>');
    });
    console.log('OOXX');
})();
