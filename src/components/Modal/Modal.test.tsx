import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import { Modal, VariantT, ColorT } from './Modal';

import { theme } from '../../theme';
import '../../setupTests';

const mockActionClick = jest.fn();

const baseProps = {
  open: true,
  onClose: () => {},
  title: 'Modal',
  children: <div>Testing a modal</div>,
  actions: [
    {
      label: 'No',
      variant: 'outlined' as VariantT,
      color: 'primary' as ColorT,
      onClick: mockActionClick,
    },
    {
      label: 'Yes',
      variant: 'contained' as VariantT,
      color: 'error' as ColorT,
      onClick: mockActionClick,
    },
  ],
};

const renderComponent = (customProps?: { testId?: string }) => {
  const props = { ...baseProps, ...customProps };

  return render(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Modal {...props} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

describe('<Modal />', () => {
  it('renders without crashing', () => {
    const view = renderComponent();
    expect(view).toMatchSnapshot();
  });

  it('should have a title', () => {
    renderComponent();
    expect(screen.getByText(baseProps.title)).toBeInTheDocument();
  });

  it('should have a text in the body', () => {
    renderComponent();
    expect(screen.getByText('Testing a modal')).toBeInTheDocument();
  });

  it('should have a data-test-id', () => {
    const testId = 'test-modal';
    renderComponent({ testId });
    const element = screen.getByTestId(testId);
    expect(element).toBeInTheDocument();
  });

  it('should have two action buttons with data-test-id', () => {
    const testId = 'modal-action-button';
    renderComponent();
    const element1 = screen.getByTestId(`${testId}-0`);
    const element2 = screen.getByTestId(`${testId}-1`);
    expect(element1).toBeInTheDocument();
    expect(element2).toBeInTheDocument();
  });

  it('should fire an event when an action gets clicked', () => {
    renderComponent();
    const testId = 'modal-action-button';
    const element1 = screen.getByTestId(`${testId}-0`);
    fireEvent.click(element1);
    expect(mockActionClick).toHaveBeenCalledTimes(1);
  });
});
