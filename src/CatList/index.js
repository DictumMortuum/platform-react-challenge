import React from 'react';
import Box from '@mui/material/Box';
import { Link, useLocation } from 'react-router-dom';
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

const CatList = ({ data }) => {
  const location = useLocation();
  const records = filterDuplicates(data);

  return (
    <Gallery>
      {records.map(d => {
        const { id, url, breeds: [{ name }] } = d;

        return (
          <Box key={id} width={size} height={size}>
            <Link to={`/img/${id}`} state={{ background: location, ...d }}>
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
            </Link>
          </Box>
        );
      })}
    </Gallery>
  );
}

export default CatList;
