import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useFavourites } from './useFavourites';
import { useFavourite } from '../CatDetail/useFavourite';

const FavouriteListItem = ({ id, refetch, image: { url }}) => {
  const { isLoading, removeFavourite } = useFavourite();

  const onClick = () => {
    removeFavourite(id);
    refetch();
  }

  return (
    <Grid item xs={12} md={4} xl={3} >
      <Card>
        <CardMedia data-testid="favouriteimage" component="img" image={url} alt={id} sx={{ height: 200 }} />
        <CardActions disableSpacing>
          <IconButton data-testid="button-unfavourite" disabled={isLoading} aria-label="remove from favorites" onClick={onClick}>
            <DeleteIcon data-testid="icon" />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}

const FavouriteListWrapper = () => {
  const { items, refetch } = useFavourites({ sub_id: process.env.REACT_APP_SUB_ID });

  return (
    <Grid container spacing={2}>
      {items.map(d => <FavouriteListItem key={d.id} {...d} refetch={refetch} />)}
    </Grid>
  );
}

export default FavouriteListWrapper;
