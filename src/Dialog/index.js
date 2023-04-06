import Paper from '@mui/material/Paper';
import { styled } from '@mui/material';

const Dialog = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "75%",
  p: 4,
}));

export default Dialog;
