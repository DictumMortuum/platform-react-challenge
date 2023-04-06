import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import BreedDetail from '../BreedDetailWrapper';

const BreedDetailModal = ({ limit }) => {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box>
        <BreedDetail limit={limit} />
      </Box>
    </Modal>
  );
}

export default BreedDetailModal;
