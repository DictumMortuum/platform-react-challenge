import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Link, useLocation } from 'react-router-dom';

const filterDuplicates = col => {
  const ids = col.map(d => d.id);
  return col.filter(
    ({ id }, i) => !ids.includes(id, i+1)
  );
}

const CatList = ({ data, openModal }) => {
  const location = useLocation();
  const records = filterDuplicates(data);

  return (
    <Grid container spacing={2}>
      {records.map(d => {
        const { id, url, breeds: [{ name }] } = d;

        return (
          <Grid item xs={12} md={4} xl={3} key={id}>
            <Card>
              <Link to={`/img/${id}`} state={ openModal ? { background: location, ...d } : {background: null, ...d } }>
                <CardMedia data-testid="catimage" component="img" image={url} alt={name} sx={{ height: 200 }} />
              </Link>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default CatList;
