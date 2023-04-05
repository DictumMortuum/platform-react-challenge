import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material';

const filterDuplicates = col => {
  const ids = col.map(d => d.id);
  return col.filter(
    ({ id }, i) => !ids.includes(id, i+1)
  );
}

const size = 200;

const Gallery = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: `repeat(auto-fit, minmax(${size}px, 1fr))`,
  gap: theme.spacing(3),
  paddingBottom: theme.spacing(1),
  paddingTop: theme.spacing(1),
}));

const CatListItem = ({ data }) => {
  const records = filterDuplicates(data);

  return (
    <Gallery>
      {records.map(({ id, url, breeds: [{ name }] }) => (
        <Box key={id} width={size} height={size}>
          <img
            src={url}
            srcSet={url}
            alt={name}
            loading="lazy"
            data-testid="catimage"
            style={{
              width: "100%",
              height: size,
              borderRadius: 8,
              objectFit: "cover"
            }}
          />
        </Box>
      ))}
    </Gallery>
  );
}

export default CatListItem;
