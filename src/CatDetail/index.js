import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Dialog from '../Dialog';
import { useFavourite } from './useFavourite';

const CatDetail = ({ id, url, breeds }) => {
  const { isLoading, setFavourite } = useFavourite();

  let name;
  let description;
  let breed_id;
  if (breeds.length > 0) {
    const [breed] = breeds;
    name = breed.name;
    breed_id = breed.id;
    description = breed.description;
  }

  return (
    <Dialog>
      <Card>
        {name && <CardHeader title={name} data-testid="header" />}
        <CardMedia component="img" image={url} alt={id} style={{ maxHeight: 800 }} />
        {description && <CardContent data-testid="content">
          <Typography>{description}</Typography>
        </CardContent>}
        <CardActions disableSpacing>
          <IconButton data-testid="button" disabled={isLoading} aria-label="add to favorites" onClick={() => setFavourite(id, process.env.REACT_APP_SUB_ID)}>
            <FavoriteIcon data-testid="icon" />
          </IconButton>
          <Link to={`/breeds/${breed_id}`}>
            <Button>Breed Details</Button>
          </Link>
        </CardActions>
      </Card>
    </Dialog>
  );
};

export default CatDetail;
