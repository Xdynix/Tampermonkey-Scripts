// ==UserScript==
// @name         Disable Numpad For YouTube
// @namespace    https://github.com/Xdynix/Tampermonkey-Scripts
// @homepage     https://github.com/Xdynix/Tampermonkey-Scripts
// @version      0.0.1
// @description  Disable the numpad on Youtube videos to prevent the video from jumping accidentally (especially when using the right arrow key).
// @author       Xdynix
// @updateURL    https://github.com/Xdynix/Tampermonkey-Scripts/raw/master/src/Disable%20Numpad%20For%20YouTube.js
// @downloadURL  https://github.com/Xdynix/Tampermonkey-Scripts/raw/master/src/Disable%20Numpad%20For%20YouTube.js
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==


(function () {
    'use strict';

    window.addEventListener('keydown', e => {
        if ('0123456789'.includes(e.key) && e.location === KeyboardEvent.DOM_KEY_LOCATION_NUMPAD) {
            e.stopPropagation();
        }
    }, true);

    console.log('Numpad not allowed.');
})();
