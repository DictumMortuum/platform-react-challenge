import { useState } from 'react';
import { addFavourite, delFavourite } from './api';

export const useFavourite = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rs, setResponse] = useState({});
  const [error, setError] = useState(null);

  const setFavourite = (image_id, sub_id) => {
    if (isLoading) return;
    setIsLoading(true);
    addFavourite({ image_id, sub_id }).then(({ json, err }) => {
      if (err !== undefined) {
        setError(err);
      } else {
        setResponse(json);
      }
      setIsLoading(false);
    });
  };

  const removeFavourite = (image_id) => {
    if (isLoading) return;
    setIsLoading(true);
    delFavourite({ image_id }).then(({ json, err }) => {
      if (err !== undefined) {
        setError(err);
      } else {
        setResponse(json);
      }
      setIsLoading(false);
    });
  }

  return {
    rs,
    isLoading,
    error,
    setFavourite,
    removeFavourite
  };
}
