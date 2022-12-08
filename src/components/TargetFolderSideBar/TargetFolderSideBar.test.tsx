import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { theme } from '../../theme';
import '../../setupTests';
import { setupStore } from '../../app/store';
import TargetFolderSideBar from './TargetFolderSideBar';

beforeAll(() => {
  window.getComputedStyle = jest.fn();
});

beforeEach((): void => {
  fetchMock.resetMocks();
});

const sampleFolders = [
  {
    id: '15',
    name: 'Instructor Guide & FAQ',
    type: 'folder' as 'folder',
    children: [
      {
        id: '16',
        name: 'Intro quiz',
        type: 'folder' as 'folder',
        children: [],
      },
    ],
  },
  {
    id: '18',
    name: 'Intro Survey',
    type: 'folder' as 'folder',
    children: [],
  },
  {
    id: '3',
    name: 'Checkpoint Survey #1',
    type: 'folder' as 'folder',
    children: [],
  },
];

const baseProps = {
  isOpen: true,
  folders: [...sampleFolders],
};

const renderComponent = () => {
  const store = setupStore();

  return render(
    <Provider store={store}>
      <Router>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <TargetFolderSideBar {...baseProps} />
          </ThemeProvider>
        </StyledEngineProvider>
      </Router>
    </Provider>
  );
};

describe('<TargetFolderSideBar />', () => {
  describe('Should render properly', () => {
    it('renders without crashing', () => {
      const view = renderComponent();
      expect(view).toMatchSnapshot();
    });
    it('should render Move button', () => {
      renderComponent();
      const buttonMove = screen.getByTestId('move-button');
      expect(buttonMove).toBeInTheDocument();
    });
    it('should display a list of folder items', () => {
      renderComponent();
      const folderList = screen.getByTestId('folder-list');
      const itemRootLevel = screen.getByText('Root Level');
      const checkedItem = screen.queryByTestId('item-selected-checkmark');
      expect(folderList).toBeInTheDocument();
      expect(itemRootLevel).toBeInTheDocument();
      expect(checkedItem).not.toBeInTheDocument();
    });
  });
  describe('clicking on folder item', () => {
    it('should display a check mark', () => {
      renderComponent();
      const folderList = screen.getByTestId('folder-list');
      const itemRootLevel = screen.getByText('Root Level');
      fireEvent.click(itemRootLevel);
      const checkedItem = screen.queryByTestId('item-selected-checkmark');
      expect(folderList).toBeInTheDocument();
      expect(itemRootLevel).toBeInTheDocument();
      expect(checkedItem).toBeInTheDocument();
    });
  });
  describe('displaying nested folder items', () => {
    it('should display a left chevron icon if nested folder', () => {
      renderComponent();
      const folderList = screen.getByTestId('folder-list');
      const chevronIcon = screen.getByTestId('folder-expanded-icon');
      expect(folderList).toBeInTheDocument();
      expect(chevronIcon).toBeInTheDocument();
    });
    it('should be visible nested folder on chevron click', () => {
      renderComponent();
      const folderList = screen.getByTestId('folder-list');
      const chevronIcon = screen.getByTestId('folder-expanded-icon');
      fireEvent.click(chevronIcon);
      const IntroQuizNested = screen.queryByText(/Intro quiz/);
      expect(folderList).toBeInTheDocument();
      expect(IntroQuizNested).toBeInTheDocument();
    });
  });
});
