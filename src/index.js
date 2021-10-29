import cardTemplate from './templates/photoCard.hbs';
import ApiService from './js/apiService';
import { myError } from './js/pnotify';
import { myNotice } from './js/pnotify';
import * as basicLightbox from 'basiclightbox';
import './css/lightBox.min.css';
// import './js/interObserver';

const refs = {
 gallery: document.querySelector('.gallery'),
 searchForm: document.querySelector('.search-form'),
 sentinel: document.querySelector('.sentinel'),
};

const apiService = new ApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.gallery.addEventListener('click', onLightboxOpen);

function onSearch(e) {
 e.preventDefault();
 clearMarkup();
 apiService.query = e.currentTarget.elements.query.value;
 checkRequest();
 apiService.resetPage();
 if (apiService.query.length !== 0) {
  apiService.fetchPhotos().then(renderMarkup);
 }
}

function renderMarkup(data) {
 if (data.length === 0) {
  return myError();
 }
 refs.gallery.insertAdjacentHTML('beforeend', cardTemplate(data));
}

function clearMarkup() {
 refs.gallery.innerHTML = '';
}

function checkRequest() {
 if (apiService.query === '') {
  return myNotice();
 }
}

function onLightboxOpen(e) {
 if (e.target.nodeName !== 'IMG') {
  return;
 }
 const instance = basicLightbox.create(
  `<img src="${e.target.dataset.src}" width="800" height="600">`,
 );
 instance.show();
}

const onEntry = entries => {
 entries.forEach(entry => {
  if (entry.isIntersecting && apiService.query !== '') {
   apiService.fetchPhotos().then(renderMarkup);
  }
 });
};
const options = {
 rootMargin: '200px',
};
const observer = new IntersectionObserver(onEntry, options);

observer.observe(refs.sentinel);
