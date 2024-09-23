// ==UserScript==
// @name        discogshide
// @namespace   dicksogs
// @match       *://*.discogs.com/release/stats/*
// @grant       none
// @version     1.0
// @author      yui
// @description Hides specified users from discogs "have" lists
// ==/UserScript==

const users = ["Laxes"]

String.prototype.lsplit = function(str) {
    const idx = this.indexOf(str);
    return [this.slice(0, idx), this.slice(idx)];
}

function plusHidden(groupEl) {
    let el = groupEl.querySelector('p');
    if (!el) {
        const listEl = groupEl.querySelector('.release_stats_group_list')

        el = document.createElement("p");
        el.innerHTML = '0 more not shown';
        listEl.appendChild(el)
    }
    const [num, str] = el.innerHTML.lsplit(' ');

    if (isNaN(num)) {
        console.error("hidden count is not a number");
        return;
    }

    el.innerHTML = (Number.parseInt(num) + 1).toString() + str;
}

window.onload = () => users.forEach(user => document.querySelectorAll(`a[href*="${user}"]`).forEach(el => {
    let actualEl = el;
    while (!(actualEl instanceof HTMLLIElement)) {
        actualEl = actualEl.parentElement;
    }

    let groupEl = actualEl.parentElement;
    while (!groupEl.classList.contains('release_stats_group')) {
        groupEl = groupEl.parentElement;
    }

    if (!groupEl.innerHTML.includes('have') && !groupEl.innerHTML.includes('has')) {
        return;
    }

    actualEl.remove();
    plusHidden(groupEl);
}));

