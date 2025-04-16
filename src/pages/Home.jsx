import React, { useEffect } from 'react';
import { LandingSection } from '@components/home';
import useAppSelector from '@hooks/useAppSelector';
import useAppDispatch from '@hooks/useAppDispatch';
import { selectIsAuthenticated } from '@features/auth/selectors';
import { selectAppLoading, selectAppData } from '@features/app/selectors';
import { fetchAppData } from '@features/app/appSlice';
import { Loader } from '@components/common';

const Home = () => {
  const dispatch = useAppDispatch();
  // Check if user is authenticated
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const appData = useAppSelector(selectAppData);
  const loading = useAppSelector(selectAppLoading);

  // Make sure app data is loaded
  useEffect(() => {
    if (!appData) {
      dispatch(fetchAppData());
    }
  }, [appData, dispatch]);

  // Show loader while data is being fetched
  if (loading || !appData) {
    return <Loader fullScreen />;
  }

  // For now, we'll just show the landing section
  // In a real app, you'd show a dashboard if the user is authenticated
  return <LandingSection />;
};

export default Home;
