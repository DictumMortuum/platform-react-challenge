import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';

const BreedList = ({ data }) => {
  const location = useLocation();

  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {data.map(d => {
        const { id, name, temperament } = d;

        return (
          <Grid item xs={12} md={4} xl={3} key={id}>
            <Card data-testid="breed">
              <CardHeader title={name} />
              <CardContent sx={{ height: 150 }}>
                <Typography>{temperament}</Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Link to={`/breeds/${id}`} state={{ background: location, ...d }}>
                  <Button>Images</Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default BreedList;
