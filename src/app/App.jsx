import css from './App.module.css';
import { useState, useEffect, useRef } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchPictures } from 'services/ApiService';
import { Searchbar, ImageGallery, Button, Loader } from 'components';

export function App() {

  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [status, setStatus] = useState('idle');

  const intervalId = useRef(null);

  useEffect(() => {

    async function makeNewFetch () {
    try {
      const response = await fetchPictures(query, page);
      const { totalHits, hits } = response;

      if (totalHits === 0) {
        setLastPage(1);
        setStatus('rejected');
        Notify.failure('Sorry, there are no images matching your search request. Please try another request.');
        return;
      }

      setLastPage(Math.ceil(totalHits / 12));
      setImages(hits);
      setStatus('resolved');
      Notify.success(`Hurray! ${totalHits} images found`);

    } catch (error) {
      setStatus('rejected');
      console.log(error.message);
    }
    }

    async function loadMore () {
    try {
      const response = await fetchPictures(query, page);
      const newImages = response.hits;
      setImages(images => [...images, ...newImages]);
      setStatus('resolved');
      intervalId.current = setTimeout(() => scroll(), 100);

      } catch (error) {
        setStatus('rejected');
        console.log(error);
      }
    }
    
    if (page === 1 && query !== "") {
      setStatus('pending');
      makeNewFetch();
    }
    
    if (page > 1) {
      setStatus('pending');
      loadMore();
    }

    return () => {
      clearInterval(intervalId.current);
    }
  }, [query, page]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newQuery = event.target.elements.input.value.trim();

    if (newQuery === "") {
      return Notify.warning('Search field is empty. Please, enter your request');
    }

    if (newQuery === query) {
      return Notify.warning('That is the same request. Please, enter a new one');
    }

    setStatus('pending');
    setImages([]);
    setPage(1);
    setQuery(newQuery);
}

  const handleBtnClick = () => {
    setPage(page => page + 1);
  }

  const scroll = () => {
    const { clientHeight } = document.documentElement;
    window.scrollBy({
      top: clientHeight - 180,
      behavior: 'smooth',
    });
  };

  return (
      <div className={css.App}>
        <Searchbar onSubmit={handleSubmit} isSubmitting={status === 'pending'} />
        <main>
          {images.length > 0 && <ImageGallery images={images} />}
          {status === 'pending'
            ? (<Loader />)
            : page !== lastPage && (<Button onClick={handleBtnClick} />)}
        </main>
      </div>
    )
  }