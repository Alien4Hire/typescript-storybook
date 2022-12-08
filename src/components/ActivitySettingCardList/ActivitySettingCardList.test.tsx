import { screen, render, fireEvent } from '@testing-library/react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import renderer from 'react-test-renderer';

import { theme } from '../../theme';

import { default as ActivitySettingCardList, mockCardsList } from './index';
import { CardListPropsT } from './ActivitySettingCardList';

beforeAll(() => {
  window.getComputedStyle = jest.fn();
});

const baseProps = {
  cards: mockCardsList,
  checkedId: '',
  onChecked: jest.fn(),
  onDelete: jest.fn(),
};

const Component = (props: CardListPropsT) => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <ActivitySettingCardList {...props} />
    </ThemeProvider>
  </StyledEngineProvider>
);

const renderComponent = (customProps: Partial<CardListPropsT> = {}) => {
  const props: CardListPropsT = { ...baseProps, ...customProps };
  return render(<Component {...props} />);
};

describe('<ActivitySettingCardList />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Component {...baseProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correct count of list items', () => {
    renderComponent();
    const radioElements = screen.getAllByTestId('RadioButton');
    expect(radioElements.length).toBe(baseProps.cards.length);
  });

  it('should not render if count of list items is zero', () => {
    renderComponent({ cards: [] });
    const radioElements = screen.queryAllByTestId('RadioButton');
    expect(radioElements.length).toBe(0);
  });

  it('should call onChecked function', () => {
    renderComponent();
    const [firstRadioElement, secondRadioElement] =
      screen.getAllByTestId('RadioButton');
    expect(baseProps.onChecked).not.toBeCalled();
    fireEvent.click(secondRadioElement);
    expect(baseProps.onChecked).toBeCalledTimes(1);

    fireEvent.click(firstRadioElement);
    expect(baseProps.onChecked).toBeCalledTimes(2);
  });

  it('should call onDelete function', () => {
    renderComponent();
    const [firstDeleteButton, secondDeleteButton] =
      screen.getAllByTestId('IconButton');
    expect(baseProps.onDelete).not.toBeCalled();
    fireEvent.click(secondDeleteButton);
    expect(baseProps.onDelete).toBeCalledTimes(1);
    expect(baseProps.onDelete).toBeCalledWith(baseProps.cards[1].id);

    fireEvent.click(firstDeleteButton);
    expect(baseProps.onDelete).toBeCalledTimes(2);
    expect(baseProps.onDelete).toBeCalledWith(baseProps.cards[0].id);
  });
});
