import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import LoginPageView from './LoginPageView';
import {
  googleAuthAsync,
  selectUser,
  selectStatus,
} from '../../../app/reducers/login/loginSlice';
import { selectGoogleClientKey } from '../../../app/reducers/config/configSlice';

export const loginPathName = '/login';

const SpinnerWrapper = styled('div')({
  width: '200px',
  margin: '100px auto',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const loginStatus = useAppSelector(selectStatus);
  const { pathname } = useLocation();
  const googleClientId = useAppSelector(selectGoogleClientKey);
  const clientId = googleClientId ?? 'not-configured';

  const onSuccessHandler = (
    response: google.accounts.id.CredentialResponse
  ) => {
    dispatch(
      googleAuthAsync(
        (response as google.accounts.id.CredentialResponse).credential
      )
    );
  };

  const onFailureHandler = (error: any) => {
    console.log('Google login error', error);
  };

  if (user) {
    const navigateTo = pathname === loginPathName ? '/' : pathname;
    return <Navigate to={navigateTo} replace={true} />;
  }

  const verifyingUser = loginStatus === 'loading';
  const loadingGoogle = !googleClientId;

  if (verifyingUser) {
    return (
      <SpinnerWrapper>
        <CircularProgress />
        <span>One moment...</span>
      </SpinnerWrapper>
    );
  }

  return (
    <LoginPageView
      user={user}
      googleClientId={clientId}
      loadingGoogle={loadingGoogle}
      onSuccessHandler={onSuccessHandler}
      onFailureHandler={onFailureHandler}
    />
  );
};

export default LoginPage;
