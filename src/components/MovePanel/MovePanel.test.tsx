import { render } from '@testing-library/react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import MovePanel from './MovePanel';

import { theme } from '../../theme';
import '../../setupTests';

const baseProps = {
  disabled: false,
  onUp: jest.fn(),
  onDown: jest.fn(),
  onDoubleUp: jest.fn(),
  onDoubleDown: jest.fn(),
  onReorganize: jest.fn(),
};

const renderComponent = () => {
  return render(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <MovePanel {...baseProps} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

describe('<MovePanel />', () => {
  it('renders without crashing', () => {
    const view = renderComponent();
    expect(view).toMatchSnapshot();
  });
});
