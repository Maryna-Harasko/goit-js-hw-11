import { refs } from "./refs";
import simpleLightbox from "simplelightbox";

export function createMarkup(data) {
    return data.hits
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => {
          return `<div class="gallery__item">
         <a href="${largeImageURL}">
    <img class='gallery__image' src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
    <div class="info">
      <p class="info__item">
        <b>Likes</b>
        ${likes}
      </p>
      <p class="info__item">
        <b>Views</b>
        ${views}
      </p>
      <p class="info__item">
        <b>Comments</b>
        ${comments}
      </p>
      <p class="info__item">
        <b>Downloads</b>
        ${downloads}
      </p>
    </div>
  </div>`;
        }
      )
      .join('');
  }
  
  export function addMarkup(markup, lightbox) {
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
  }
