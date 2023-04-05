import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import CatList from './CatList';
import CatModal from './CatModal';
import { useLocation, Routes, Route } from 'react-router-dom';

function App() {
  let location = useLocation();
  let state = location.state;

  return (
    <>
      <CssBaseline />
      <Routes location={state === null ? location : state.BackgroundLocation}>
        <Route path="/">
          <Route index element={<CatList limit={10} />} />
          <Route path="/img/:id" element={<CatModal />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
