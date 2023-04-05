import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useMediaQuery, useTheme } from '@mui/material';

const filterDuplicates = col => {
  const ids = col.map(d => d.id);
  return col.filter(
    ({ id }, i) => !ids.includes(id, i+1)
  );
}

const CatListItem = ({ data }) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const xl = useMediaQuery(theme.breakpoints.down("xl"));
  const records = filterDuplicates(data);

  return (
    <ImageList cols={sm ? 2 : xl ? 4 : 5}>
      {records.map(({ id, url, breeds: [{ name }] }) => (
        <ImageListItem key={id}>
          <img src={url} srcSet={url} alt={name} loading="lazy" data-testid="catimage" />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default CatListItem;
