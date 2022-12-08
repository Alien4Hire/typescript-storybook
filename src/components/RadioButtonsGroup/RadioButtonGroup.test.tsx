import { render, fireEvent, screen } from '@testing-library/react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import renderer from 'react-test-renderer';

import { theme } from '../../theme';
import '../../setupTests';

import RadioButtonsGroup, { GroupPropsT } from './RadioButtonsGroup';

beforeAll(() => {
  window.getComputedStyle = jest.fn();
});

const baseProps: GroupPropsT = {
  options: [
    { label: 'label 1', value: '1' },
    { label: 'label 2', value: '2' },
  ],
  value: '2',
  onChange: jest.fn(),
};

const Component = (props: GroupPropsT) => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <RadioButtonsGroup {...props} />
    </ThemeProvider>
  </StyledEngineProvider>
);

const renderComponent = (customProps: Partial<GroupPropsT> = {}) => {
  const props: GroupPropsT = { ...baseProps, ...customProps };

  return render(<Component {...props} />);
};

describe('<RadioButtonsGroup />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Component {...baseProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render with default value from options', () => {
    renderComponent();
    const uncheckedElement: HTMLInputElement =
      screen.getByLabelText(/label 1/i);
    const checkedElement: HTMLInputElement = screen.getByLabelText(/label 2/i);

    expect(uncheckedElement.checked).toBe(false);
    expect(checkedElement.checked).toBe(true);
  });

  it('should render with default value from defaultValue field', () => {
    renderComponent({ value: undefined, defaultValue: '2' });
    const uncheckedElement: HTMLInputElement =
      screen.getByLabelText(/label 1/i);
    const checkedElement: HTMLInputElement = screen.getByLabelText(/label 2/i);

    expect(uncheckedElement.checked).toBe(false);
    expect(checkedElement.checked).toBe(true);
  });

  it('should call onChange fn', () => {
    renderComponent();
    const firstElement = screen.getByLabelText('label 1');

    expect(baseProps.onChange).not.toBeCalled();

    fireEvent.click(firstElement);
    expect(baseProps.onChange).toBeCalledTimes(1);
  });
});
