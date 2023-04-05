import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Container from '@mui/material/Container';
import CatList from './List';
import { useCats } from './useCats';

const CatListWrapper = ({ limit }) => {
  const { loadMore, isLoading, items } = useCats({ limit });

  return (
    <Container>
      <CatList data={items} />
      <LoadingButton loading={isLoading} variant="contained" data-testid="morecat" onClick={loadMore}>Load More</LoadingButton>
    </Container>
  );
}

export default CatListWrapper;
