'use strict';




import * as items from './items.js';


const getSel = sel => document.querySelector(sel);
const getSelAll = sel => document.querySelectorAll(sel);



getSel('.search__input').addEventListener('input', function () {
    getSel('.search__close').style.display = 'block';
    const value = getSel('.search__input').value;
    if (value.length == 0) getSel('.search__close').style.display = 'none';
})




getSel('.search__close').addEventListener('click', function () {
    getSel('.search__close').style.display = 'none';
    getSel('.search__input').value = '';
})
getSel('.search__input').addEventListener('focus', function () {
    const value = getSel('.search__input').value;
    if (value.length > 0) getSel('.search__close').style.display = 'block';
})



let id

getSel('.search__btn').addEventListener('click', function () {
    while (getSelAll('.result__element').length) {
        getSelAll('.result__element')[0].remove()
    }

    const value = getSel('.search__input').value;
    getSel('.search__close').style.display = 'none';
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `http://www.omdbapi.com/?s=${value}&apikey=b29d3e1a`, false);
    xhr.send();
    let x = JSON.parse(xhr.responseText)
    // console.log(x.Search);
    if (x.Search) {
        for (let i = 0; i < x.Search.length; i++) {
            items.makeContent(x.Search[i], i)
        }
    }
    let buttons = getSelAll('.result__btn');
    for (const button of buttons) {
        button.onclick = function () {
            id = event.target.getAttribute('data-index-number');
            items.makeModalMoreInf(id)
        }
    }

})


getSel('.modal').addEventListener('click', function (e) {
    if (e.target.className == 'modal show') {
        getSel('.modal').classList.remove('show');
        document.body.style.overflow = 'auto';

    }
})