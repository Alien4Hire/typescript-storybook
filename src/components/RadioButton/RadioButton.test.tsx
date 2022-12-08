import { render, fireEvent, screen } from '@testing-library/react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

import { theme } from '../../theme';
import '../../setupTests';

import RadioButton, { RadioButtonPropsT } from './RadioButton';

beforeAll(() => {
  window.getComputedStyle = jest.fn();
});

const baseProps = {
  label: 'Test',
  value: 'test value',
  onChange: jest.fn(),
  checked: false,
  testId: 'testId',
};

const Component = (props: RadioButtonPropsT) => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <RadioButton {...props} />
    </ThemeProvider>
  </StyledEngineProvider>
);

const renderComponent = (customProps = {}) => {
  const props: RadioButtonPropsT = { ...baseProps, ...customProps };

  return render(<Component {...props} />);
};

describe('<RadioButton />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Component {...baseProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correct label', () => {
    renderComponent();
    expect(screen.getByText(baseProps.label)).toBeInTheDocument();
  });

  describe('check onChange fn', () => {
    it('should call function after checkbox click', () => {
      renderComponent();
      const radioElement: HTMLInputElement = screen.getByLabelText('Test');

      expect(radioElement.checked).toBe(false);
      expect(baseProps.onChange).not.toBeCalled();

      fireEvent.click(radioElement);
      expect(baseProps.onChange).toBeCalledTimes(1);
    });

    it('should call function after label click', () => {
      renderComponent();
      const radioLabel = screen.getByLabelText('Test');

      fireEvent.click(radioLabel);
      expect(baseProps.onChange).toBeCalledTimes(1);
    });
  });
});
