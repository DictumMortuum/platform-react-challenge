import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import CatListWrapper from './CatListWrapper';
import CatDetailModal from './CatDetailModal';
import CatDetailWrapper from './CatDetailWrapper';
import BreedListWrapper from './BreedListWrapper';
import BreedDetailWrapper from './BreedDetailWrapper';
import BreedDetailModal from './BreedDetailModal';
import { useLocation, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';

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
            <Route path="/breeds/:id" element={<BreedDetailWrapper limit={10} />} />
          </Route>
        </Routes>
        {background && (
          <Routes>
            <Route path="/img/:id" element={<CatDetailModal />} />
            <Route path="/breeds/:id" element={<BreedDetailModal limit={10} />} />
          </Routes>
        )}
      </Container>
    </>
  );
}

export default App;
