import { render } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import { Provider } from 'react-redux';
import { store } from '../../app/store';

import Wrapper from './Wrapper';

import { theme } from '../../theme';
import '../../setupTests';

const baseProps = {
  sidebarVisible: true,
  children: <div>Hello world!</div>,
};

const renderComponent = () => {
  return render(
    <Provider store={store}>
      <Router>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <Wrapper {...baseProps} />
          </ThemeProvider>
        </StyledEngineProvider>
      </Router>
    </Provider>
  );
};

describe('<Wrapper />', () => {
  it('renders without crashing', () => {
    const view = renderComponent();
    expect(view).toMatchSnapshot();
  });
});
