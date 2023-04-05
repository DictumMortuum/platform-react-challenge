import { useState, useEffect, useCallback } from 'react';
import { fetchBreeds } from './api';

export const useBreeds = ({ perPage }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [breeds, setBreeds] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  const API = useCallback(() => {
    fetchBreeds().then(({ json, err }) => {
      if (err !== undefined) {
        setError(err);
      } else {
        setBreeds(json);
      }
      setIsLoading(false);
    });
  }, []);

  const changePage = p => {
    setPage(p);
  }

  useEffect(() => {
    API();
  }, [API]);

  return {
    breeds,
    page,
    current_breeds: breeds.slice((page-1)*perPage, page*perPage),
    count: Math.ceil(breeds.length/perPage),
    isLoading,
    error,
    changePage,
  };
}
