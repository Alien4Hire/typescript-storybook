import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import fetchMock from 'jest-fetch-mock';
import { render, fireEvent, screen, act } from '@testing-library/react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import '@testing-library/jest-dom/extend-expect';

import RecursiveTreeView from './RecursiveTreeView';
import { theme } from '../../theme';
import { children } from '../FolderNavigator/sampleData';
import { store } from '../../app/store';
import * as Util from './utils';
import { generateId } from './utils';
import '../../setupTests';

jest.setTimeout(10000);

jest.mock('./utils', () => ({
  generateId: jest.requireActual('./utils').generateId,
  launchActivity: jest.fn(),
}));

beforeAll(() => {
  window.getComputedStyle = jest.fn();
});

beforeEach(() => {
  fetchMock.resetMocks();
  jest.clearAllMocks();
  fetchMock.mockResponse(JSON.stringify(children));
});

const renderComponent = () => {
  return render(
    <Provider store={store}>
      <Router>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <RecursiveTreeView />
          </ThemeProvider>
        </StyledEngineProvider>
      </Router>
    </Provider>
  );
};

describe('<RecursiveTreeView />', () => {
  it('renders without crashing', () => {
    const view = renderComponent();
    expect(view).toMatchSnapshot();
  });

  describe('should create new items', () => {
    it('into root folder', () => {
      renderComponent();

      const items = [
        {
          addItemText: /assessment/i,
          textBoxLabel: /add assessment/i,
          itemName: 'test assessment',
        },
        //TODO: upgrade this to handle multiple URLs added via the CSV modal NGCSA-296
        // { addItemText: /url/i, textBoxLabel: /add url/i, itemName: 'test url' },
        {
          addItemText: /writing activity/i,
          textBoxLabel: /add writing activity/i,
          itemName: 'test activity',
        },
      ];

      items.forEach((item) => {
        // const toggleFolder = () => fireEvent.click(wrapper.getByText(data.children[0].name));

        // TODO: upgrade for subfolders
        // toggleFolder(); // open folder

        // const treeItem = wrapper.getByRole('treeitem', {
        //   name: /Goal Setting and Reflection Surveys/
        // });

        fireEvent.click(screen.getByText(item.addItemText));

        fireEvent.change(screen.getByLabelText(item.textBoxLabel), {
          target: { value: item.itemName },
        });

        fireEvent.click(screen.getByText('Add'));

        expect(screen.getByText(item.itemName)).toBeInTheDocument();

        // toggleFolder(); // close folder
        // fireEvent.click(wrapper.getByText(data.children[0].name));

        // console.log('debug', wrapper.debug());
        // wrapper.rerender();
        // expect(wrapper.queryByText(item.itemName)).toBe(null);
      });
    });
  });

  describe('Clicking activity labels', () => {
    it('should launch the activity', () => {
      renderComponent();
      const FolderLabel = screen.getByText('Goal 1');
      fireEvent.click(FolderLabel);
      const activityLabel = screen.getByText('Checkpoint Survey #1');
      fireEvent.click(activityLabel);
      expect(Util.launchActivity).toHaveBeenCalled();
    });
  });

  describe('check items selecting', () => {
    it('should item be checked after select', () => {
      renderComponent();
      const checkbox: HTMLInputElement = screen.getByTestId(
        children[0].name + ' checkbox'
      );
      expect(checkbox.checked).toEqual(false);
      fireEvent.click(checkbox);
      expect(checkbox.checked).toEqual(true);
      fireEvent.click(checkbox);
      expect(checkbox.checked).toEqual(false);
    });

    it('should clean selected items after open other folder', () => {
      renderComponent();
      const checkbox: HTMLInputElement = screen.getByTestId(
        children[0].name + ' checkbox'
      );
      fireEvent.click(checkbox);

      const secondFolder = screen.getByText(children[1].name);
      expect(checkbox.checked).toEqual(true);
      fireEvent.click(secondFolder);
      expect(checkbox.checked).toEqual(false);
    });
  });

  // TODO: figure out why 'act' is unnecessary and re-enable linter
  describe('check items opening', () => {
    it('should close first folder after open second', async () => {
      renderComponent();
      const { children: firstFolderChildren } = children[0];
      const getFirstSubFolder = () =>
        screen.queryByText(firstFolderChildren[0].name);
      const { children: generalSubFolderChildren } = children[1];
      const getGeneralSubFolder = () =>
        screen.queryByText(generalSubFolderChildren[1].name);

      const firstFolderName = screen.getByText(children[0].name);
      expect(getFirstSubFolder()).toBe(null);
      fireEvent.click(firstFolderName);
      expect(getFirstSubFolder()).toBeInTheDocument();
      // expect(
      //   wrapper.findAllByText(data.children[1].children[1].name)
      // ).toHaveLength(1);

      const secondFolder = screen.getByText(children[1].name);
      // eslint-disable-next-line testing-library/no-unnecessary-act
      await act(async () => {
        await fireEvent.click(secondFolder);
        await screen.findByText(generalSubFolderChildren[1].name);
        expect(getFirstSubFolder()).toBe(null);
        expect(getGeneralSubFolder()).toBeInTheDocument();
      });
    });
  });

  // describe('should item be ')
});

describe('<RecursiveTreeView /> utils', () => {
  it('should generate id', () => {
    expect(generateId().length).toBeGreaterThanOrEqual(6);
  });
});

describe('<RecursiveTreeView /> show image when no lessons returned from server.', () => {
  it('should exists id for img no content', () => {
    fetchMock.mockResponse(JSON.stringify([]));
    renderComponent();
    const imgNoContent = () => screen.queryByTestId('NoContent');
    expect(imgNoContent).not.toBeNull();
  });
});
