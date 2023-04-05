import React from 'react';
import Modal from '@mui/material/Modal';
import { useLocation, useNavigate } from 'react-router-dom';
import CatDetail from '../CatDetail';
import Box from '@mui/material/Box';

const CatModal = () => {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  }
  const { state } = useLocation();
  const { id, url, breeds } = state;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box>
        <CatDetail id={id} url={url} breeds={breeds} />
      </Box>
    </Modal>
  );
}

export default CatModal;
