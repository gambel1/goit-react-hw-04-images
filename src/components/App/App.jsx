import { AppContainer } from './App.styled';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import ApiFetchGallery from '../../api/ApiFetchGallery';
import { useState, useEffect } from 'react';
import Loader from '../Loader/Loader';
import React from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }

    setIsLoading(true);

    async function fetchFunction() {
      const { totalHits, hits } = await ApiFetchGallery(query, page);

      if (totalHits === 0) {
        Notify.failure('По вашему запросу ничего не найдено');
        setIsLoading(false);
        return;
      }

      setImages(prevState => (page === 1 ? hits : [...prevState, ...hits]));
      setTotalHits(prevState =>
        page === 1 ? totalHits - hits.length : prevState - hits.length
      );
      setIsLoading(false);
    }
    fetchFunction().catch(error => {
      Notify.failure('Что-то пошло не так');
      setIsLoading(false);
    });
  }, [page, query]);

  function handleLoadMore() {
    setPage(prevState => prevState + 1);
  }

  function handleQuerySubmit(query) {
    setQuery(query);
    setPage(1);
  }

  return (
    <AppContainer>
      <Searchbar submit={handleQuerySubmit} />
      {images && <ImageGallery images={images} />}

      {!isLoading && images.length > 0 && totalHits > images.length && (
        <Button lodeMore={handleLoadMore} />
      )}
      {isLoading && <Loader />}
    </AppContainer>
  );
}
