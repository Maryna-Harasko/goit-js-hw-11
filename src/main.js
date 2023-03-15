import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { PixabayAPI } from './js/pixabayApi';
import { refs } from './js/refs';
import { createMarkup } from './js/markup';
import { addMarkup } from './js/markup';
import Notiflix from 'notiflix';

const lightbox = new SimpleLightbox('.gallery a', { 
  captionsData: "alt",
  captionDelay: 250,
});

const pixabayAPI = new PixabayAPI();

refs.form.addEventListener('submit', onSearchImage);

async function onSearchImage (e) {
  e.preventDefault();
    
  pixabayAPI.query = e.currentTarget.elements.searchQuery.value.trim().toLowerCase();
  pixabayAPI.decrementPage();
  clearPage();
    if (!pixabayAPI.query) {
        Notiflix.Notify.failure('Entry text');
        return;
      }
      pixabayAPI.query = pixabayAPI.query;

    try {
      const data = await pixabayAPI.getPhotos();
  
      pixabayAPI.totalHits = data.totalHits;
  
      pixabayAPI.calculateTotalpages();
  
      if (data.totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      } else {
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images..`);
      }
      refs.form.reset();
  
      const markup = createMarkup(data);
      addMarkup(markup, lightbox);
      const target = document.querySelector('.gallery__item:last-child');
      observer.observe(target);
    } catch (error) {
      Notiflix.Notify.failure(error.message, 'Oops...something wrong');
      clearPage();
    }
  };
  
function clearPage() {
    pixabayAPI.decrementPage();
    refs.gallery.innerHTML = '';
  }

  const options = {
    rootMargin: '50px',
    threshold: 0.5,
  };

  const onEntry = async (entries) => {
    if (entries[0].isIntersecting && pixabayAPI.page < pixabayAPI.totalPages) {
      pixabayAPI.incrementPage();
      try {
        const data = await pixabayAPI.getPhotos();
        const markup = createMarkup(data);
        addMarkup(markup, lightbox);
      } catch (error) {
        Notiflix.Notify.failure(error.message, 'Oops...something wrong');
        clearPage();
      }
    };
  };

  const observer = new IntersectionObserver(onEntry, options);