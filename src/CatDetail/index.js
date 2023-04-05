import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material';
import { useFavourite } from './useFavourite';

const Dialog = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "50%",
  p: 4,
}));

const CatDetail = ({ id, url, breeds }) => {
  const { isLoading, setFavourite } = useFavourite();

  let name;
  let description;
  if (breeds.length > 0) {
    const [breed] = breeds;
    name = breed.name;
    description = breed.description;
  }

  return (
    <Dialog>
      <Card>
        {name && <CardHeader title={name} data-testid="header" />}
        <CardMedia component="img" image={url} alt={id} style={{ maxHeight: 800 }} />
        {description && <CardContent data-testid="content">
          <Typography variant="body2" color="text.secondary">{description}</Typography>
        </CardContent>}
        <CardActions disableSpacing>
          <IconButton data-testid="button" disabled={isLoading} aria-label="add to favorites" onClick={() => setFavourite(id, process.env.REACT_APP_SUB_ID)}>
            <FavoriteIcon data-testid="icon" />
          </IconButton>
        </CardActions>
      </Card>
    </Dialog>
  );
};

export default CatDetail;
