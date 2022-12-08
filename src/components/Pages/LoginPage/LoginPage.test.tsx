import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';

import LoginPage from './index';
import { setupStore } from '../../../app/store';

const mockStore = setupStore({
  config: {
    status: 'idle',
    googleClientKey: 'mock-client-key',
  },
  login: {
    status: 'idle',
  },
});

const renderComponent = () =>
  render(
    <Provider store={mockStore}>
      <Router>
        <LoginPage />
      </Router>
    </Provider>
  );

describe('<LoginPage />', () => {
  test('renders without crashing', () => {
    const view = renderComponent();
    expect(view).toMatchSnapshot();
  });
});
