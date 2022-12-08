import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import fetchMock from 'jest-fetch-mock';

import ActivitySettingsPage from './index';

import { theme } from '../../../theme';
import '../../../setupTests';
import { setupStore } from '../../../app/store';

beforeEach((): void => {
  fetchMock.resetMocks();
});

const renderComponent = () => {
  const store = setupStore();

  return render(
    <Provider store={store}>
      <Router>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <ActivitySettingsPage />
          </ThemeProvider>
        </StyledEngineProvider>
      </Router>
    </Provider>
  );
};

describe('<ActivitySettingsPage />', () => {
  it('renders without crashing', () => {
    fetchMock.mockResponse(JSON.stringify([]));
    const view = renderComponent();
    expect(view).toMatchSnapshot();
  });
});
