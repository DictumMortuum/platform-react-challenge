import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';

const pages = [{
  name: "cats",
  link: "/"
}, {
  name: "breeds",
  link: "/breeds"
}, {
  name: "favourites",
  link: "/favourites"
}];

const Bar = () => {
  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon />
          {pages.map(({ name, link }) => (
            <Link to={link}>
              <Button sx={{ color: 'white', display: 'block' }}>{name}</Button>
            </Link>
          ))}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Bar;
