import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { children } from '../FolderNavigator/sampleData';
import FolderNavigator from './FolderNavigator';
import { store } from '../../app/store';
import '../../setupTests';

const baseProps = {};

beforeEach(() => {
  fetchMock.resetMocks();
  jest.clearAllMocks();
  fetchMock.mockResponse(JSON.stringify(children));
});

const renderComponent = () => {
  return render(
    <Provider store={store}>
      <Router>
        <FolderNavigator {...baseProps} />
      </Router>
    </Provider>
  );
};

it('renders without crashing', () => {
  const view = renderComponent();
  expect(view).toMatchSnapshot();
});
