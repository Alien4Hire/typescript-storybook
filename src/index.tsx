import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import * as serviceWorker from './serviceWorker';
import AppRoutes from './components/Routes';
import { store } from './app/store';

import { theme } from './theme';
import {
  googleAuthAsync,
  getCaTokenCookie,
} from './app/reducers/login/loginSlice';

// If token, verify user
const token = getCaTokenCookie();
if (token) {
  store.dispatch(googleAuthAsync(token));
}

ReactDOM.render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <React.StrictMode>
          <Suspense fallback={<div>Loading ...</div>}>
            <CookiesProvider>
              <Router>
                <AppRoutes />
              </Router>
            </CookiesProvider>
          </Suspense>
        </React.StrictMode>
      </ThemeProvider>
    </StyledEngineProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
