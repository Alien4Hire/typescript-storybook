import React, { useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { CaUserT } from '../../../app/reducers/login/loginSlice';

type LoginPageViewT = {
  user: CaUserT | undefined;
  googleClientId: string;
  loadingGoogle: boolean;
  onSuccessHandler: (response: google.accounts.id.CredentialResponse) => void;
  onFailureHandler: (error: any) => void;
};

const StyledLoginWrapper = styled(Card)({
  width: '350px',
  padding: '1em',
  margin: '3em auto',
  'text-align': 'center',
});

const StyledCardActions = styled(CardActions)({
  'justify-content': 'center',
});

const LoginPageView = ({
  user,
  googleClientId,
  loadingGoogle,
  onSuccessHandler,
  onFailureHandler,
}: LoginPageViewT) => {
  const [snackbarOpen, setSnackbarOpen] = React.useState<boolean>(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef?.current && window.google) {
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: (response) => {
          if (response.credential) {
            onSuccessHandler(response);
          } else {
            setSnackbarOpen(true);
            onFailureHandler(new Error('Unable to login'));
          }
        },
      });
      window.google.accounts.id.renderButton(divRef.current, {
        theme: 'outline',
        size: 'medium',
        type: 'standard',
        text: 'signin_with',
      });
    }
  }, [googleClientId, divRef, onSuccessHandler, onFailureHandler]);

  return (
    <>
      <Snackbar
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Unable to login via Google
        </Alert>
      </Snackbar>
      <StyledLoginWrapper>
        <CardContent>
          <Typography variant="h2" component="div">
            Macmillan Course Assembly
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Please login with your Macmillan Google account.
          </Typography>
        </CardContent>
        <StyledCardActions>
          {loadingGoogle && <p>Please Wait...</p>}
          {!loadingGoogle && <div ref={divRef} />}
        </StyledCardActions>
      </StyledLoginWrapper>
    </>
  );
};

export default LoginPageView;
