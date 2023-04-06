import { useState, useEffect, useCallback } from 'react';
import { fetchFavourites } from './api';

export const useFavourites = ({ sub_id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [shouldRefetch, setRefetch] = useState(0);

  const API = useCallback(() => {
    if (isLoading) return;
    setIsLoading(true);
    fetchFavourites({ sub_id }).then(({ json, err }) => {
      if (err !== undefined) {
        setError(err);
      } else {
        setItems(json);
      }
      setIsLoading(false);
    });
  // eslint-disable-next-line
  }, [sub_id]);

  useEffect(() => {
    API();
  }, [sub_id, shouldRefetch, API]);

  const refetch = () => {
    API();
    setRefetch(shouldRefetch+1);
  }

  return {
    items,
    isLoading,
    error,
    refetch
  };
}
