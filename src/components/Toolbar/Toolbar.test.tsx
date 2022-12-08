import { render, fireEvent, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ReactRouterDom, { MemoryRouter as Router } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import Toolbar from './Toolbar';
import '../../setupTests';
import { Provider } from 'react-redux';
import fetchMock from 'jest-fetch-mock';
import { setupStore } from '../../app/store';
import { theme } from '../../theme';
import { useGetTemplateViewTypesQuery } from '../../app/reducers/templateViewTypes/templateViewTypesAPI';
import * as AppSlice from '../../app/reducers/appSlice/appSlice';

jest.mock('../../app/reducers/templateViewTypes/templateViewTypesAPI');
const useGetTemplateViewTypesQueryMock =
  useGetTemplateViewTypesQuery as jest.Mock;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

beforeEach((): void => {
  fetchMock.resetMocks();
});

const baseProps = {
  isReorganizeMode: false,
  onReorganizeClick: jest.fn(),
  onDoneClick: jest.fn(),
  color: 'primary',
};

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
const renderComponent = (customReduxState = {}) => {
  const defaultReduxState = {
    templateViewTypes: {
      types,
      selected: types[0],
    },
  };
  const newReduxState = { ...defaultReduxState, ...customReduxState };
  const store = setupStore(newReduxState);
  return render(
    <Provider store={store}>
      <Router>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <Toolbar {...baseProps} />
          </ThemeProvider>
        </StyledEngineProvider>
      </Router>
    </Provider>
  );
};

beforeEach(() => {
  window.getComputedStyle = jest.fn();
  useGetTemplateViewTypesQueryMock.mockReturnValue({ data: types });
  jest.spyOn(ReactRouterDom, 'useParams').mockReturnValue({
    templateId: 'mock-template-id',
    templateVersionId: 'mock-template-version-id',
  });
});

describe('<Toolbar />', () => {
  describe('Default component state', () => {
    it('Should match default snapshot', () => {
      const view = renderComponent();
      expect(view).toMatchSnapshot();
    });
    it('Should display the `Sync to Prebuilt` button', () => {
      renderComponent();
      const textCopyToPrebuilt = screen.getByText(/Sync to Prebuilt/);
      expect(textCopyToPrebuilt).toBeInTheDocument();
    });
    it('Should NOT display the number of resources selected', () => {
      renderComponent();
      const textResourcesSelected = screen.queryByText(/Resource Selected/);
      expect(textResourcesSelected).not.toBeInTheDocument();
    });
  });

  describe('When a user clicks "Sync to Prebuilt" button', () => {
    beforeEach(() => {
      window.getComputedStyle = jest.fn().mockImplementation(() => {
        return {
          paddingRight: 10,
        };
      });
    });

    it('Should open a warning modal', () => {
      renderComponent();
      const syncButton = screen.getByText('Sync to Prebuilt');
      fireEvent.click(syncButton);
      // make assumption that the modal have continue and cancel button
      const continueButton = screen.getByText('Continue');
      const cancelButton = screen.getByText('Cancel');
      expect(continueButton).toBeInTheDocument();
      expect(cancelButton).toBeInTheDocument();
    });

    it('Should close modal when "cancel" button is clicked by user', () => {
      renderComponent();
      const syncButton = screen.getByText('Sync to Prebuilt');
      fireEvent.click(syncButton);
      // make assumption that the modal have continue and cancel button
      const continueButton = screen.getByText('Continue');
      const cancelButton = screen.getByText('Cancel');
      expect(continueButton).toBeInTheDocument();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);
      expect(continueButton).not.toBeInTheDocument();
      expect(cancelButton).not.toBeInTheDocument();
    });

    it('Should close modal and display success message after successfully calling the API', async () => {
      fetchMock.mockResponse(JSON.stringify({}));
      const setToastNotificationSpy = jest
        .spyOn(AppSlice, 'setToastNotification')
        .mockReturnValueOnce({
          payload: {
            message:
              'Your activities have been successfully synced to Prebuilt Course!',
            open: true,
            type: 'success',
          },
          type: 'foo',
        });
      renderComponent();
      const syncButton = screen.getByText('Sync to Prebuilt');
      fireEvent.click(syncButton);
      // make assumption that the modal have continue and cancel button
      const continueButton = screen.getByText('Continue');
      const cancelButton = screen.getByText('Cancel');
      expect(continueButton).toBeInTheDocument();
      expect(cancelButton).toBeInTheDocument();

      // eslint-disable-next-line testing-library/no-unnecessary-act
      await act(async () => {
        fireEvent.click(continueButton);
      });
      expect(setToastNotificationSpy).toBeCalledWith({
        message:
          'Your activities have been successfully synced to Prebuilt Course!',
        open: true,
        type: 'success',
      });
      expect(continueButton).not.toBeInTheDocument();
      expect(cancelButton).not.toBeInTheDocument();
    });

    it('Should close modal and display error message when API call fails', async () => {
      fetchMock.mockReject(new Error('Mock failed API call'));
      const setToastNotificationSpy = jest
        .spyOn(AppSlice, 'setToastNotification')
        .mockReturnValueOnce({
          payload: {
            message: 'Sync to Prebuilt Course failed!',
            open: true,
            type: 'error',
          },
          type: 'foo',
        });
      renderComponent();
      const syncButton = screen.getByText('Sync to Prebuilt');
      fireEvent.click(syncButton);
      // make assumption that the modal have continue and cancel button
      const continueButton = screen.getByText('Continue');
      const cancelButton = screen.getByText('Cancel');
      expect(continueButton).toBeInTheDocument();
      expect(cancelButton).toBeInTheDocument();

      // Thanks, testing-library for telling me I need this to work,
      // but then barking at me for using it (eslint)
      // eslint-disable-next-line testing-library/no-unnecessary-act
      await act(async () => {
        fireEvent.click(continueButton);
      });
      expect(setToastNotificationSpy).toBeCalledWith({
        message: 'Sync to Prebuilt Course failed!',
        open: true,
        type: 'error',
      });
      expect(continueButton).not.toBeInTheDocument();
      expect(cancelButton).not.toBeInTheDocument();
    });
  });

  describe('When lessons and/or folders (nodes) are selected by the user', () => {
    const customReduxStateSelectedItems = {
      lessons: {
        items: {
          id: '0',
          name: 'Root',
          type: 'root',
          children: [
            {
              id: '1092ef19-bf23-4b49-a2c0-650551f471e0',
              templateId: '9cfad609-3119-4557-a2da-e2f03b2f56b5',
              templateVersionId: 'be8c13e4-1ac1-4a89-a43f-90b245181e62',
              viewTypeId: 'd4fc4e46-b9e1-45ba-9a16-1c665fd8ce64',
              name: 'folder name',
              sequence: 1,
              nodePath: 'lBgjp4w',
              contentId: null,
              activityId: null,
              type: 'folder',
              level: 1,
              resources: 0,
              parentId: '',
              templateNodeContentMetadataId:
                '7416a376-64b6-4f8b-bedd-7dbe48aa3107',
              activitySettingName: null,
              activitySettingRecommendedUse: null,
              activitySettingVisibility: null,
              children: [],
            },
          ],
        },
        selected: ['1092ef19-bf23-4b49-a2c0-650551f471e0'],
        expanded: [],
        reorderedItems: [],
        canReorganize: true,
        reorganizeMode: false,
      },
    };
    it('Should display the `Copy to Prebuilt` button', () => {
      renderComponent(customReduxStateSelectedItems);
      const textCopyToPrebuilt = screen.getByText(/Copy to Prebuilt/);
      expect(textCopyToPrebuilt).toBeInTheDocument();
    });
    it('Should display the number of resources selected', () => {
      renderComponent(customReduxStateSelectedItems);
      const textResourcesSelected = screen.getByText(/1 Resource Selected/);
      expect(textResourcesSelected).toBeInTheDocument();
    });
  });
});
