import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import renderer from 'react-test-renderer';

import { theme } from '../../theme';
import '../../setupTests';

import ActivitySettingCard from './index';
import { mockCard } from '../ActivitySettingCardList';
import { CardPropsT } from './ActivitySettingCard';

beforeAll(() => {
  window.getComputedStyle = jest.fn();
});

const baseProps = {
  cardInfo: { ...mockCard, id: '1' },
  checked: false,
  onChecked: jest.fn(),
  onDelete: jest.fn(),
};

const Component = (props: CardPropsT) => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <ActivitySettingCard {...props} />
    </ThemeProvider>
  </StyledEngineProvider>
);

const renderComponent = (customProps: Partial<CardPropsT> = {}) => {
  const props = { ...baseProps, ...customProps };

  return render(<Component {...props} />);
};

describe('<ViewCard />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Component {...baseProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correct content', () => {
    renderComponent();

    const { id, ...fieldsForCheck } = baseProps.cardInfo;
    for (const label of Object.values(fieldsForCheck)) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it('should render with checked radio button', () => {
    renderComponent({ checked: true });
    const radioBtn: HTMLInputElement = screen.getByTestId('RadioButton');
    expect(radioBtn.checked).toBe(true);
    expect(radioBtn.value).toBe(baseProps.cardInfo.id);
  });

  it('should call onChecked function', () => {
    renderComponent();

    const radioBtn = screen.getByTestId('RadioButton');
    expect(baseProps.onChecked).not.toBeCalled();
    fireEvent.click(radioBtn);

    expect(baseProps.onChecked).toBeCalledTimes(1);
  });

  it('should call onDelete function', () => {
    renderComponent();

    const deleteBtn = screen.getByTestId('IconButton');
    expect(baseProps.onDelete).not.toBeCalled();
    fireEvent.click(deleteBtn);

    expect(baseProps.onDelete).toBeCalledTimes(1);
  });
});
