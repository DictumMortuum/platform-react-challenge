import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import CatList from './CatList';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <CatList limit={10} />
      </Container>
    </React.Fragment>
  );
}

export default App;
