import { render, fireEvent, screen } from '@testing-library/react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { DropdownMenu } from './DropdownMenu';
import { theme } from '../../theme';
import '../../setupTests';
import { ReactComponent as TrashIcon } from '../../icons/trash.svg';
import { ReactComponent as ListLeftIcon } from '../../icons/list_left.svg';

const baseProps = {
  open: true,
  options: [
    {
      label: 'Remove from Resource Structure',
      value: 'idaosnaisonf',
      icon: <TrashIcon />,
    },
    {
      label: 'Show Location in Structure',
      value: 'sodnfois',
      icon: <ListLeftIcon />,
    },
    {
      label: 'Apply Activity Setting',
      value: 'asofpafpnapon',
    },
  ],
  onItemClick: jest.fn(),
  anchorEl: document.createElement('div'),
  onClose: jest.fn(),
};

const renderComponent = (customProps?: {
  testId?: string;
  onItemClick?: jest.Mock<any, any>;
  onClose?: jest.Mock<any, any>;
}) => {
  const props = { ...baseProps, ...customProps };
  return render(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <DropdownMenu {...props} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

describe('<DropdownMenu />', () => {
  it('renders without crashing', () => {
    const view = renderComponent();
    expect(view).toMatchSnapshot();
  });

  it('should have a data-test-id', () => {
    const testId = 'test-dropdown-menu';
    renderComponent({ testId });
    const element = screen.getByTestId(testId);
    expect(element).toBeInTheDocument();
  });

  it('should fire an event when a item gets clicked', () => {
    const mockItemClick = jest.fn();
    renderComponent({ onItemClick: mockItemClick });
    const element = screen.getByText('Remove from Resource Structure');
    fireEvent.click(element);
    expect(mockItemClick).toHaveBeenCalledTimes(1);
    expect(mockItemClick).toHaveBeenCalledWith('idaosnaisonf');
  });

  it('should fire the onClose event', () => {
    const mockCloseClick = jest.fn();
    renderComponent({ onClose: mockCloseClick });
    const element = screen.getByText('Remove from Resource Structure');
    fireEvent.click(element);
    expect(mockCloseClick).toHaveBeenCalledTimes(1);
  });
});
