import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { Link, useLocation } from 'react-router-dom';

const BreedList = ({ data }) => {
  const location = useLocation();

  return (
    <Grid container spacing={2} sx={{ mb: 1 }}>
      {data.map(d => {
        const { id, name } = d;

        return (
          <Grid item xs={4} key={id}>
            <Link to={`/breeds/${id}`} state={{ background: location, ...d }}>
              <Card sx={{ minHeight: 200 }}>
                <CardHeader title={name} data-testid="header" />
              </Card>
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default BreedList;
