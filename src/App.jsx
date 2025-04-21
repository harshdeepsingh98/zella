import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchAppData } from '@features/app/appSlice';
import { Layout } from '@components/common';
import DynamicScreen from '@pages/DynamicScreen';
import Home from '@pages/Home';

const App = () => {
  const dispatch = useDispatch();

  // Fetch app data on application load
  useEffect(() => {
    dispatch(fetchAppData());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Redirect from root to the first screen */}
        <Route index element={<Home />} />

        {/* Dynamic route that handles all page codes */}
        <Route path="/:code" element={<DynamicScreen />} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/auth-1" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
