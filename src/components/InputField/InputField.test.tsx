import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import { theme } from '../../theme';

import InputField from './InputField';

const baseProps = {
  label: 'label',
  placeholder: 'placeholder',
  value: 'test',
  onChange: jest.fn(),
};

const renderComponent = () => {
  return render(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <InputField {...baseProps} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

describe('<InputField />', () => {
  it('renders without crashing', () => {
    const view = renderComponent();
    expect(view).toMatchSnapshot();
  });

  it('should render with a default value', () => {
    renderComponent();
    const inputElement = screen.getByPlaceholderText(
      baseProps.placeholder
    ) as HTMLInputElement;
    expect(inputElement.value).toBe(baseProps.value);
  });

  it('should render correct label', () => {
    renderComponent();
    const labelElement = screen.getByText(baseProps.label);
    expect(labelElement).toBeInTheDocument();
  });

  it('should call onChange function', () => {
    renderComponent();
    const testValue = '123';
    const inputElement = screen.getByPlaceholderText(baseProps.placeholder);
    expect(baseProps.onChange).not.toBeCalled();

    userEvent.type(inputElement, testValue);

    expect(baseProps.onChange).toBeCalledTimes(testValue.length);
  });
});
