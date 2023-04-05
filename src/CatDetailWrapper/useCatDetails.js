import { useState, useEffect, useCallback } from 'react';
import { fetchDetails } from './api';

export const useCatDetails = id => {
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [error, setError] = useState(null);

  const fetchCatDetails = useCallback(() => {
    fetchDetails({ id }).then(({ json, err }) => {
      if (err !== undefined) {
        setError(err);
      } else {
        setDetails(json);
      }
      setIsLoading(false);
    });
  // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    fetchCatDetails();
  }, [id, fetchCatDetails]);

  return {
    details,
    isLoading,
    error,
  };
}
