import { Provider } from 'react-redux';
import { render, fireEvent, screen } from '@testing-library/react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import '@testing-library/jest-dom/extend-expect';

import { store } from '../../app/store';
import { theme } from '../../theme';
import FolderNavigatorToolbar, {
  ToolbarPropsT,
} from './FolderNavigatorToolbar';
import '../../setupTests';

const baseProps = {
  isLastLevel: false,
  parentId: '5',
  viewTypeId: '7',
  addFolder: jest.fn(),
  addAssessment: jest.fn(),
  addUrl: jest.fn(),
  addActivity: jest.fn(),
  hasDividers: false,
  cancelAddAction: jest.fn(),
};

const renderComponent = (customProps: Partial<ToolbarPropsT> = {}) => {
  const props = { ...baseProps, ...customProps };
  return render(
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <FolderNavigatorToolbar {...props} />
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  );
};

beforeAll(() => {
  window.getComputedStyle = jest.fn();
});

describe('<FolderNavigatorToolbar />', () => {
  it('renders without crashing', () => {
    const view = renderComponent();
    expect(view).toMatchSnapshot();
  });

  it('should call handlers after click on buttons', () => {
    renderComponent();

    const testItemName = 'test_name';
    const items = [
      {
        addItemText: /folder/i,
        textBoxLabel: /add folder/i,
        handler: baseProps.addFolder,
      },
      {
        addItemText: /assessment/i,
        textBoxLabel: /add assessment/i,
        handler: baseProps.addAssessment,
      },
      {
        addItemText: /writing activity/i,
        textBoxLabel: /add writing activity/i,
        handler: baseProps.addActivity,
      },
    ];

    items.forEach((item, index) => {
      fireEvent.click(screen.getAllByText(item.addItemText)[0]);

      const textBox = screen.getByLabelText(item.textBoxLabel);
      fireEvent.change(textBox, { target: { value: testItemName } });

      expect(item.handler).not.toBeCalled();

      fireEvent.click(screen.getByText('Add'));

      expect(item.handler).toBeCalledTimes(1);
      expect(item.handler).toBeCalledWith(testItemName, baseProps.parentId);
    });
  });

  it('should fire the cancel event after click on cancel buttons', () => {
    renderComponent();
    const testItemName = 'test_name';
    const items = [
      {
        addItemText: /folder/i,
        textBoxLabel: /add folder/i,
        handler: baseProps.addFolder,
      },
      {
        addItemText: /assessment/i,
        textBoxLabel: /add assessment/i,
        handler: baseProps.addAssessment,
      },
      {
        addItemText: /writing activity/i,
        textBoxLabel: /add writing activity/i,
        handler: baseProps.addActivity,
      },
    ];

    items.forEach((item, index) => {
      fireEvent.click(screen.getAllByText(item.addItemText)[0]);

      const textBox = screen.getByLabelText(item.textBoxLabel);
      fireEvent.change(textBox, { target: { value: testItemName } });

      expect(screen.getByText('Cancel')).toBeInTheDocument();

      fireEvent.click(screen.getByText('Cancel'));
      expect(baseProps.cancelAddAction).toBeCalled();
    });
  });

  it('should render without folder button', () => {
    renderComponent({ isLastLevel: true });

    expect(screen.queryByText(/Folder/)).toEqual(null);
  });
  it('should open add url activities model', () => {
    window.getComputedStyle = jest.fn().mockImplementation(() => {
      return {
        paddingRight: 10,
      };
    });
    renderComponent();
    const urlButton = screen.getByText(('URL'))
    fireEvent.click(urlButton)
    const uploadCsvButton = screen.getByText('Upload .csv')
    const addActivityButton = screen.getByText('Add URL activities')
    expect(uploadCsvButton).toBeInTheDocument();
    expect(addActivityButton).toBeInTheDocument();
  });
});
