// import { fireEvent } from '@storybook/testing-library';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { store } from '../../app/store';
import '../../setupTests';
import { theme } from '../../theme';
import ResultList, { ResultListPropsT } from './ResultList';

const baseProps: ResultListPropsT = {
  result: [
    {
      checkedValue: 'mock-checked-value',
      checked: false,
      activityName: 'mock-activity-name',
      contentId: 'mock-content-id',
      modifiedDate: 'xx/xx/xxxx at xx/xx',
      addedToLibrary: false,
    },
  ],
  itemsOnPage: 1,
};

const Component = (props: ResultListPropsT) => (
  <Provider store={store}>
    <Router>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <ResultList {...props} />
        </ThemeProvider>
      </StyledEngineProvider>
    </Router>
  </Provider>
);

const renderComponent = (customProps: Partial<ResultListPropsT> = {}) => {
  const props = { ...baseProps, ...customProps };

  return render(<Component {...props} />);
};

describe('<ResultItem />', () => {
  it('renders without crashing', () => {
    const view = renderComponent();
    expect(view).toMatchSnapshot();
  });

  it('should render the search result', () => {
    renderComponent();
    expect(screen.getByText(/mock-activity-name/)).toBeInTheDocument();
  });

  it('Should display the `Add Resource` button if resource is not added to library', () => {
    renderComponent();
    const addResourceText = screen.getByText(/Add Resource/);
    expect(addResourceText).toBeInTheDocument();
  });

  it('Should display `In Library` text if resource is added to library', () => {
    const customProps: ResultListPropsT = {
      result: [
        {
          checkedValue: 'mock-checked-value',
          checked: false,
          activityName: 'mock-activity-name',
          contentId: 'mock-content-id',
          modifiedDate: 'xx/xx/xxxx at xx/xx',
          addedToLibrary: true,
        },
      ],
    };
    renderComponent(customProps);
    const inLibraryText = screen.getByText(/In Library/);
    expect(inLibraryText).toBeInTheDocument();
  });
});
