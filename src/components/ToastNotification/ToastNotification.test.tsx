import { render, screen } from '@testing-library/react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { ToastNotification } from './ToastNotification';
import { theme } from '../../theme';
import '../../setupTests';

const baseProps = {
  open: true,
  onClose: () => {},
  message: 'Toast Notification',
};

const renderComponent = (customProps?: { testId: string }) => {
  const props = { ...baseProps, ...customProps };

  return render(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <ToastNotification {...props} type="success" />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

describe('<ToastNotification />', () => {
  it('renders without crashing', () => {
    const view = renderComponent();
    expect(view).toMatchSnapshot();
  });

  it('should have a message', () => {
    renderComponent();
    expect(screen.getByText(baseProps.message)).toBeInTheDocument();
  });

  it('should have a data-test-id', () => {
    const testId = 'test-toast-notification';
    renderComponent({ testId });
    const element = screen.getByTestId(testId);
    expect(element).toBeInTheDocument();
  });
});
