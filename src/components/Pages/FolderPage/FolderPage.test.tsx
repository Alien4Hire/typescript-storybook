import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';

import { children } from '../../FolderNavigator/sampleData';
import FolderPage from './index';
import { store } from '../../../app/store';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { theme } from '../../../theme';
import { useGetTemplateViewTypesQuery } from '../../../app/reducers/templateViewTypes/templateViewTypesAPI';
jest.mock('../../../app/reducers/templateViewTypes/templateViewTypesAPI');
const useGetTemplateViewTypesQueryMock =
  useGetTemplateViewTypesQuery as jest.Mock;

beforeEach(() => {
  fetchMock.resetMocks();
  jest.clearAllMocks();
  fetchMock.mockResponse(JSON.stringify(children));
});

const types = [
  {
    id: 'd4fc4e46-b9e1-45ba-9a16-1c665fd8ce64',
    name: 'Resource Structure',
    description: 'Base list of activities for course',
  },
  {
    id: 'd4fc4e46-b9e1-45ba-9a16-1c665fd8ce65',
    name: 'Prebuilt Course',
    description: 'Base list of activities for course',
  },
];

beforeEach((): void => {
  jest.clearAllMocks();
});
const renderComponent = () => {
  return render(
    <Provider store={store}>
      <Router>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <FolderPage />
          </ThemeProvider>
        </StyledEngineProvider>
      </Router>
    </Provider>
  );
};

describe('<FolderPage />', () => {
  test('renders without crashing', () => {
    useGetTemplateViewTypesQueryMock.mockReturnValue({ data: types });
    const view = renderComponent();
    expect(view).toMatchSnapshot();
  });
});
