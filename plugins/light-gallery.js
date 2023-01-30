import lightGallery from 'lightgallery.js/dist/js/lightgallery.js';

export default ({ app }, inject) => {
  inject('lightGallery', lightGallery);
};