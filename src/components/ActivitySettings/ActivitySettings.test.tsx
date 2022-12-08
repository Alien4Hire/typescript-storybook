import { render, screen } from '@testing-library/react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';
import { setupStore } from '../../app/store';

import ActivitySettings from './ActivitySettings';

import { theme } from '../../theme';
import '../../setupTests';

beforeEach((): void => {
  fetchMock.resetMocks();
});

const baseProps = {};

const renderComponent = (customProps?: { testId?: string }) => {
  const store = setupStore();
  const props = { ...baseProps, ...customProps };

  return render(
    <Provider store={store}>
      <Router>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <ActivitySettings {...props} />
          </ThemeProvider>
        </StyledEngineProvider>
      </Router>
    </Provider>
  );
};

describe('<ActivitySettings />', () => {
  it('renders without crashing', () => {
    fetchMock.mockResponse(JSON.stringify([]));
    const view = renderComponent();
    expect(view).toMatchSnapshot();
  });

  it('should have a New activity setting button', () => {
    renderComponent();
    expect(screen.getByText('New activity setting')).toBeInTheDocument();
  });

  it('should have a data-test-id', () => {
    const testId = 'test-activity-settings-header';
    renderComponent({ testId });
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
