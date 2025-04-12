import './css/styles.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {getImagesByQuery} from './js/pixabay-api.js';
import {
    createGallery, 
    clearGallery, 
    showLoader, 
    hideLoader, 
    showLoadMoreButton,
    hideLoadMoreButton,
} from './js/render-functions.js';



const form = document.querySelector('.form');

const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;

const perPage = 15;


form.addEventListener('submit', async event =>{
    event.preventDefault();

    const query = event.currentTarget.elements.searchQuery.value.trim();

    if (!query){
        iziToast.warning({
            title: 'Attention',
            message: 'Input yuor request!',
            position: 'topRight',
          });
          return;
    }

    try{
        showLoader(); 
        hideLoadMoreButton();
        clearGallery();

        currentQuery = query;
        currentPage = 1;

        const data = await getImagesByQuery(currentQuery, currentPage);
        

        if (data.hits.length === 0) {
            iziToast.info({
              title: 'There is nothing was found',
              message: 'Try another request',
              position: 'topRight',
            });
            return;
        }
      
        createGallery(data.hits);

        const totalPages = Math.ceil(data.totalHits / perPage);
        if (currentPage < totalPages) {
          showLoadMoreButton();
        }

        
    
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Something went wrong!',
            position: 'topRight',
          });
    } finally {
        hideLoader();
    }
});

loadMoreBtn.addEventListener('click', async () => {
    currentPage +=1;

    try{
        showLoader();
        
        const data = await getImagesByQuery(currentQuery, currentPage);

        createGallery(data.hits);

        const totalPages = Math.ceil(data.totalHits / perPage);

        if (currentPage >= totalPages) {
            hideLoadMoreButton();
        

        iziToast.info({
            title: 'End of collection',
            message: "We're sorry, but you've reached the end of search results.",
            position: 'topRight',
          });
        }

        const firstGalleryItem = document.querySelector('.gallery .gallery__item');
    if (firstGalleryItem) {
      const { height: cardHeight } = firstGalleryItem.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
   
    } catch (error){
        iziToast.error({
            title: 'Error',
            message: 'Failed to load more images.',
            position: 'topRight',
          });
    } finally{
        hideLoader();
    }
});