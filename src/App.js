import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import CatListWrapper from './CatListWrapper';
import CatModal from './CatModal';
import { useLocation, Routes, Route } from 'react-router-dom';
import CatDetailWrapper from './CatDetailWrapper';
import { Container } from '@mui/material';
import BreedListWrapper from './BreedListWrapper';

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <CssBaseline />
        <Container>
        <Routes location={background || location}>
          <Route path="/">
            <Route index element={<CatListWrapper limit={10} />} />
            <Route path="/img/:id" element={<CatDetailWrapper />} />
            <Route path="/breeds" element={<BreedListWrapper perPage={12} />} />
          </Route>
        </Routes>
        {background && (
          <Routes >
            <Route path="/img/:id" element={<CatModal />} />
          </Routes>
        )}
      </Container>
    </>
  );
}

export default App;
