// ==UserScript==
// @name        soundcloud better date display
// @namespace   soundclown
// @match       https://soundcloud.com/*
// @grant       none
// @version     1.0
// @author      yui
// @description changes ALL time displays to show full date/time
// ==/UserScript==

new MutationObserver(muts => muts.forEach(mut =>
    mut.target.querySelectorAll(".relativeTime")
      .forEach(x => x.children[x.children.length-1].innerText = x.title)
)).observe(document.body, { childList: true, subtree: true });

