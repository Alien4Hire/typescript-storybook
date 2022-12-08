import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { loginPathName } from '../Pages/LoginPage';
import { selectUser } from '../../app/reducers/login/loginSlice';

type ProtectedRoutePropsT = {
  children: JSX.Element;
};

const ProtectedRoutesHelper = ({ children }: ProtectedRoutePropsT) => {
  const user = useAppSelector(selectUser);
  const location = useLocation();

  if (!user) {
    const navState = { location };
    return <Navigate to={loginPathName} replace={true} state={navState} />;
  }

  return children;
};

export default ProtectedRoutesHelper;
