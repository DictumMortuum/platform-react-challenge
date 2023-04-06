import React from 'react';
import CatList from '../CatList';
import Dialog from '../Dialog';
import { useParams } from 'react-router-dom';
import { useBreedDetails } from './useBreedDetails';

const BreedDetail = ({ limit }) => {
  const params = useParams();
  const { id } = params;
  const { details } = useBreedDetails({ breed_id: id, limit });

  return (
    <Dialog>
      <CatList data={details} openModal={false} />
    </Dialog>
  );
}

export default BreedDetail;
