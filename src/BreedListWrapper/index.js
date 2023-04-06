import React from 'react';
import Pagination from '@mui/material/Pagination';
import BreedList from '../BreedList';
import { useBreeds } from './useBreeds';

const BreedListWrapper = ({ perPage }) => {
  const { current_breeds, count, page, changePage } = useBreeds({ perPage });

  return (
    <>
      <Pagination count={count} page={page} onChange={(e, p) => changePage(p)} />
      <BreedList data={current_breeds} />
    </>
  );
}

export default BreedListWrapper;
