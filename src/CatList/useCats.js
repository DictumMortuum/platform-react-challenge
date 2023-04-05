import { useState, useEffect, useCallback } from 'react';
import { fetchImages } from './api';

export const useCats = ({ limit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const fetchCats = useCallback(() => {
    if (isLoading) return;
    setIsLoading(true);
    fetchImages({ page, limit }).then(({ json, err }) => {
      if (err !== undefined) {
        setError(err);
      } else {
        setItems([...items, ...json]);
      }
      setIsLoading(false);
    });
  // eslint-disable-next-line
  }, [page, limit])

  const loadMore = () => {
    setPage(page+1);
  }

  useEffect(() => {
    fetchCats();
  }, [page, limit, fetchCats]);

  return {
    items,
    page,
    isLoading,
    error,
    loadMore
  };
}
