import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchAppData } from '@features/app/appSlice';
import { Layout } from '@components/common';
import Home from '@pages/Home';
import MobileAuth from '@pages/MobileAuth';
import OtpVerify from '@pages/OtpVerify';
import PersonalInfo from '@pages/PersonalInfo';

const App = () => {
  const dispatch = useDispatch();

  // Fetch app data on application load
  useEffect(() => {
    dispatch(fetchAppData());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="auth">
          <Route path="mobile" element={<MobileAuth />} />
          <Route path="otp" element={<OtpVerify />} />
          <Route path="personal-info" element={<PersonalInfo />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;