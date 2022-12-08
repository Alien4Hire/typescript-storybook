import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import FolderDropdown from './FolderDropdown';
import { store } from '../../app/store';
import '../../setupTests';

const baseProps = {
  open: true,
  anchorEl: document.createElement('div'),
  onItemClick: jest.fn(),
  onClose: jest.fn(),
};

const renderComponent = () => {
  return render(
    <Provider store={store}>
      <Router>
        <FolderDropdown {...baseProps} />
      </Router>
    </Provider>
  );
};

it('renders without crashing', () => {
  const view = renderComponent();
  expect(view).toMatchSnapshot();
});
