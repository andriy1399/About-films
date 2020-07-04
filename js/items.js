'use strict';

const getSel = sel => document.querySelector(sel);
const getSelAll = sel => document.querySelectorAll(sel);


function makeTag(tag, place, className, text) {
    let tagItem = document.createElement(tag);
    text ? tagItem.innerHTML = text : false;
    className ? tagItem.className = className : false;
    place.append(tagItem);
    return tagItem;
}

function makeContent(obj, index) {
    makeTag('div', getSel('.result__content'), 'result__element');
    makeTag('img', getSelAll('.result__element')[index]).setAttribute('src', getImg(obj.Poster));
    makeTag('div', getSelAll('.result__element')[index], 'result__inf-content');
    makeTag('div', getSelAll('.result__inf-content')[index], 'result__title-wrapper');
    makeTag('h1', getSelAll('.result__title-wrapper')[index], false, obj.Title);
    makeTag('div', getSelAll('.result__inf-content')[index], 'result__short-inf');
    makeTag('p', getSelAll('.result__short-inf')[index], false, obj.Type);
    makeTag('p', getSelAll('.result__short-inf')[index], false, obj.Year);
    makeTag('button', getSelAll('.result__inf-content')[index], 'btn result__btn', 'More details').setAttribute('data-index-number', obj.imdbID);
}

function getImg(obj) {
    if (obj == 'N/A') {
        return 'https://semantic-ui.com/images/wireframe/image.png'
    } else return obj;
}

function makeModalMoreInf(id) {
    getSel('.modal__information-wrapper').innerHTML = '';
    getSel('.modal').classList.add('show');
    document.body.style.overflow = 'hidden';
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `http://www.omdbapi.com/?i=${id}&apikey=b29d3e1a`, false);
    xhr.send();
    let inf = JSON.parse(xhr.responseText)
    
    getSel('.modal__img').setAttribute('src', getImg(inf.Poster));
    makeTag('div', getSel('.modal__information-wrapper'), 'modal__title-wrapper title-wrapper', `<h1>${inf.Title}</h1>`);
    makeTag('p', getSel('.modal__information-wrapper'), 'modal__some-short-txt', `${inf.Rated}, ${inf.Country}, ${inf.Genre}`);
    makeTag('p', getSel('.modal__information-wrapper'), false, `<span>Written by:</span> ${inf.Writer}`);
    makeTag('p', getSel('.modal__information-wrapper'), false, `<span>Directed by:</span> ${inf.Director}`);
    makeTag('p', getSel('.modal__information-wrapper'), false, `<span>Starring:</span> ${inf.Actors}`);
    makeTag('p', getSel('.modal__information-wrapper'), false, `<span>BoxOffice:</span> ${inf.BoxOffice}`);
    makeTag('p', getSel('.modal__information-wrapper'), false, `<span>Awards:</span> ${inf.Awards}`);
    makeTag('p', getSel('.modal__information-wrapper'), false, `<span>Ratings:</span> ${getRatings(inf.Ratings)}`);
    makeTag('p', getSel('.modal__information-wrapper'), 'modal__short-story', inf.Plot)
   
} 

function getRatings(arr) {
    let list = ''
    for (let i = 0; i < arr.length; i++) {
        list += `<li>${arr[i].Source}: ${arr[i].Value}</li>`
    }
    return `<ul> ${list}</ul>`
}
export {
    makeContent,
    makeModalMoreInf
}