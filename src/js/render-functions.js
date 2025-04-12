import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;
const gallery = document.querySelector('.gallery');

export function createGallery(images) {
    
    const markup = images
        .map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
            return `
            <a class="gallery__item" href="${largeImageURL}">
             <img class="gallery__image" src="${webformatURL}" alt="${tags}" />
               <div class="info">
              <p class="info-item"><b>Likes:</b> ${likes}</p>
              <p class="info-item"><b>Views:</b> ${views}</p>
              <p class="info-item"><b>Comments:</b> ${comments}</p>
              <p class="info-item"><b>Downloads:</b> ${downloads}</p>
            </div>
        </a>`;
        
        })

    .join('');

    gallery.insertAdjacentHTML('beforeend', markup);

    if (!lightbox) {
        lightbox = new SimpleLightbox('.gallery a', {
          captionsData: 'alt',
          captionDelay: 250,
        });
      } else {
        lightbox.refresh(); // 🔄 обновить при повторной вставке
      }
};



export function clearGallery() {
    return gallery.innerHTML = '';
};

export function showLoader() {
    document.querySelector('.loader').classList.remove('hidden');
};

export function hideLoader(){
    document.querySelector('.loader').classList.add('hidden');
};

export function showLoadMoreButton(){
    document.querySelector('.load-more').classList.remove('load-more-hidden');
};

export function hideLoadMoreButton(){
    document.querySelector('.load-more').classList.add('load-more-hidden');
};


