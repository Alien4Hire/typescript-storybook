import { render } from '@testing-library/react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { MemoryRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from '../../app/store';

import TopMenu from './TopMenu';

import { theme } from '../../theme';
import '../../setupTests';

const renderComponent = () => {
  return render(
    <Provider store={store}>
      <Router>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <TopMenu />
          </ThemeProvider>
        </StyledEngineProvider>
      </Router>
    </Provider>
  );
};

describe('<TopMenu />', () => {
  it('renders without crashing', () => {
    const view = renderComponent();
    expect(view).toMatchSnapshot();
  });
});
