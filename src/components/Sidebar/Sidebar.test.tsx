import { render } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import Sidebar from './Sidebar';
import { store } from '../../app/store';
import { theme } from '../../theme';
import '../../setupTests';

const baseProps = {
  disabled: false,
};

const renderComponent = () => {
  return render(
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Router>
            <Sidebar {...baseProps} />
          </Router>
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  );
};

describe('<Sidebar />', () => {
  it('renders without crashing', () => {
    const view = renderComponent();
    expect(view).toMatchSnapshot();
  });
});
