// import { fireEvent } from '@storybook/testing-library';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { store } from '../../app/store';
import '../../setupTests';
import { theme } from '../../theme';
import ResultItem, { ResultItemPropsT } from './ResultItem';

const baseProps: ResultItemPropsT = {
  addedToLibrary: true,
  checked: false,
  checkedValue: 'testValue',
  contentId: 'ID',
  activityName: 'Title',
  modifiedDate: 'xx/xx/xxxx at xx/xx',
  onAddResource: jest.fn(),
  onCheck: jest.fn(),
};

const Component = (props: ResultItemPropsT) => (
  <Provider store={store}>
    <Router>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <ResultItem {...props} />
        </ThemeProvider>
      </StyledEngineProvider>
    </Router>
  </Provider>
);

const renderComponent = (customProps: Partial<ResultItemPropsT> = {}) => {
  const props = { ...baseProps, ...customProps };

  return render(<Component {...props} />);
};

beforeAll(() => {
  window.getComputedStyle = jest.fn();
});

describe('<ResultItem />', () => {
  it('renders without crashing', () => {
    const view = renderComponent();
    expect(view).toMatchSnapshot();
  });

  it('should render passed fields', () => {
    renderComponent();

    [baseProps.contentId, baseProps.activityName].forEach((item) => {
      screen.getByText(new RegExp(item));
    });
  });

  it('should render icon when resource was added', () => {
    renderComponent();

    expect(screen.getByText(/In Library/)).toBeInTheDocument();
  });

  it('should render "Add Resource button"', () => {
    renderComponent({ addedToLibrary: false });

    const addResourceButton = screen.getByText(/Add Resource/);
    expect(addResourceButton).toBeInTheDocument();
  });
});
