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




getSel('.search__btn').addEventListener('click', function () {
    if (getSelAll('.result__element').length > 4) {
        let width = document.body.scrollWidth;
        getSel('.wrapper').style.width = width + 'px';
    }

    while (getSelAll('.result__element').length) {
        getSelAll('.result__element')[0].remove()
    }

    const value = getSel('.search__input').value;
    getSel('.search__close').style.display = 'none';
    getMovies(value)
        .then(data => {
            getSel('.result__content').innerHTML = '';
            for (let i = 0; i < data.length; i++) {
                items.makeContent(data[i], i);
            }
            return new Promise(resolve => {
                setTimeout(() => {
                    for (let i = 0; i < data.length; i++) {
                        resolve(getSelAll('.result__element')[i].classList.add('result__element--opacity'));
                    }
                }, 100)
            })
        })
        .then(ok => ok)
        .then(() => {
            let buttons = getSelAll('.result__btn');
            for (const button of buttons) {
                button.onclick = function () {
                    let id = event.target.getAttribute('data-index-number');
                    items.getFilmInf(id)
                        .then(inf => items.makeModalMoreInf(inf))
                        .then(() => setTimeout(() => {
                            getSel('.modal').classList.add('modal--opacity')
                        }, 100))
                        .then(() => setTimeout(() => {
                            getSel('.modal__window').classList.add('modal__window--mg-top')
                        }, 200))
                }
            }
        })
        .catch(val => {
            getSel('.result__content').innerHTML = `Your search - /<h3> ${val} </h3>/ did not match any documents`;
        })
})


getSel('.modal').addEventListener('click', function (e) {
    if (e.target.className == 'modal show modal--opacity') {
        getSel('.modal').classList.remove('modal--opacity');
        document.body.style.overflow = 'auto'
        getSel('.modal__window').classList.remove('modal__window--mg-top');
        setTimeout(() => getSel('.modal').classList.remove('show'), 400);
        getSel('.wrapper').style.width = '100%';

    }
})


function getMovies(val) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `http://www.omdbapi.com/?s=${val}&apikey=b29d3e1a`, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                JSON.parse(xhr.response).Response != 'False' ?
                    resolve(JSON.parse(xhr.response).Search) :
                    reject(val)
            }
        }
        xhr.send();
    })
}

window.addEventListener('resize', function () {
    getSel('.wrapper').style.width = '100%'
})