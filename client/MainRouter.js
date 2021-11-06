import React from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import authHelper from './helpers/auth-helper';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Home from './pages/Home';
import EditProfile from './pages/users/EditProfile';
import Profile from './pages/users/Profile';
import Users from './pages/users/Users';

const RequireAuth = ({ children }) => {
  let location = useLocation();

  if (!authHelper.isAuthenticated()) {
    return <Navigate to='/signin' state={{ from: location }} />;
  }

  return children;
};

const MainRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='users' element={<Users />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='signin' element={<SignIn />} />
      <Route
        path='*'
        element={
          <RequireAuth>
            <Routes>
              <Route path='/users/:userId' element={<Profile />} />
              <Route path='/users/:userId/edit' element={<EditProfile />} />
            </Routes>
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default MainRouter;
