import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import renderer from 'react-test-renderer';

import { theme } from '../../theme';

import Select, { SelectTypeT } from './Select';

beforeAll(() => {
  window.getComputedStyle = jest.fn();
});

const baseProps = {
  value: '1',
  onChange: jest.fn(),
  options: [
    { label: 'label 1', value: '1' },
    { label: 'label 2', value: '2' },
  ],
};

const Component = (props: SelectTypeT) => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <Select {...props} />
    </ThemeProvider>
  </StyledEngineProvider>
);

const renderComponent = (customProps: Partial<SelectTypeT>) => {
  const props = { ...baseProps, ...customProps };

  return render(<Component {...props} />);
};

describe('<Select />', () => {
  it('renders without crashing', () => {
    const tree = renderer.create(<Component {...baseProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render with a default value', () => {
    renderComponent({ value: baseProps.options[1].value });
    const selectElement = screen.getByText(baseProps.options[1].label);
    expect(selectElement).toBeInTheDocument();
  });

  // it('should call onChange function', () => {
  //   const { container } = renderComponent({ value: baseProps.options[0].value });
  //   const selectElement = screen.getByText(baseProps.options[0].label);
  //   // userEvent.mouseDown(selectElement);
  //   userEvent.click(selectElement);
  //   // expect(baseProps.onChange).not.toBeCalled();
  //   screen.debug();
  //   // userEvent.click(screen.getByText(baseProps.options[1].label));
  //   // expect(baseProps.onChange).toBeCalledTimes(1);
  //   // expect(baseProps.onChange).toBeCalledWith(1);
  //   // fireEvent(
  //   //   selectElement,
  //   //   new MouseEvent('mouseenter'),
  //   // );
  // });
});
