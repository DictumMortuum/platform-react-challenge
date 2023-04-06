import { useState, useEffect, useCallback } from 'react';
import { fetchBreedDetails } from './api';

export const useBreedDetails = ({ breed_id, limit }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState([]);
  const [error, setError] = useState(null);

  const API = useCallback(() => {
    fetchBreedDetails({ breed_id, limit }).then(({ json, err }) => {
      if (err !== undefined) {
        setError(err);
      } else {
        setDetails(json);
      }
      setIsLoading(false);
    });
  }, [breed_id, limit]);

  useEffect(() => {
    API();
  }, [breed_id, API]);

  return {
    details,
    isLoading,
    error,
  };
}
