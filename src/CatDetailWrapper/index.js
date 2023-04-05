import React from 'react';
import CatDetail from '../CatDetail';
import { useCatDetails } from './useCatDetails';
import { useParams } from 'react-router-dom';

const CatDetailWrapper = () => {
  const params = useParams();
  const { id } = params;
  const { isLoading, details } = useCatDetails(id);

  if (isLoading)
    return;

  return (
    <CatDetail {...details} />
  );
}

export default CatDetailWrapper;
