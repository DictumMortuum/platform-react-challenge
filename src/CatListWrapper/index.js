import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import CatList from '../CatList';
import { useCats } from './useCats';

const CatListWrapper = ({ limit }) => {
  const { loadMore, isLoading, items } = useCats({ limit });

  return (
    <>
      <CatList data={items} />
      <LoadingButton loading={isLoading} variant="contained" data-testid="morecat" onClick={loadMore}>Load More</LoadingButton>
    </>
  );
}

export default CatListWrapper;
