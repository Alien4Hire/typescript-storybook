import { Suspense } from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render, screen, act } from '@testing-library/react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import { Provider } from 'react-redux';
import { store } from '../../app/store';

import ProtectedRoutesHelper from './ProtectedRoutesHelper';
import Routes from './Routes';

import { theme } from '../../theme';
import '../../setupTests';

jest.mock('./ProtectedRoutesHelper');
jest.mock('../../app/reducers/config/configApi', () => {
  return Promise.resolve({
    googleClientKey: 'mock-client-key',
  });
});

const folderPageTestId = 'FolderPage';
const activitySettingsPageTestId = 'ActivitySettingsPage';
const searchPageTestId = 'SearchPage';
const templatesPageTestId = 'TemplatesPage';
const templatesEditPageTestId = 'TemplatesEdit';
const templatesNewVersionPageTestId = 'TemplatesNewVersion';
const suspenseTestId = 'SuspenseTestId';

jest.mock('../Pages/FolderPage', () => () => (
  <div data-testid={folderPageTestId} />
));
jest.mock('../Pages/ActivitySettingsPage', () => () => (
  <div data-testid={activitySettingsPageTestId} />
));
jest.mock('../Pages/SearchPage', () => () => (
  <div data-testid={searchPageTestId} />
));
jest.mock('../Pages/TemplatesPage', () => () => (
  <div data-testid={templatesPageTestId} />
));
jest.mock('../Pages/TemplatesPage/TemplateEdit', () => () => (
  <div data-testid={templatesEditPageTestId} />
));
jest.mock('../Pages/TemplatesPage/TemplateNewVersion', () => () => (
  <div data-testid={templatesNewVersionPageTestId} />
));

const Component = ({ pathname = '/' } = {}) => (
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<div data-testid={suspenseTestId} />}>
          <Router initialEntries={[pathname]}>
            <Routes />
          </Router>
        </Suspense>
      </ThemeProvider>
    </StyledEngineProvider>
  </Provider>
);

const renderComponent = ({ pathname = '/' }) => {
  return render(<Component pathname={pathname} />);
};

describe('<Routes /> Component', () => {
  const mockedProtectedRoutesHelper = ProtectedRoutesHelper as jest.Mock;

  beforeEach(() => {
    mockedProtectedRoutesHelper.mockImplementation(({ children }) => {
      return children;
    });
  });

  afterEach(() => {
    mockedProtectedRoutesHelper.mockClear();
  });

  it('renders without crashing', () => {
    const view = renderComponent({});
    expect(view).toMatchSnapshot();
  });

  describe('When a route is protected and the user is logged in', () => {
    it('should show suspense fallback', () => {
      renderComponent({
        pathname: '/templates/:id/activities/:templateVersionId',
      });
      expect(screen.getByTestId(suspenseTestId)).toBeInTheDocument();
    });

    it('should render edit template metadata page', async () => {
      renderComponent({ pathname: '/templates/:id/edit/:templateVersionId' });
      await act(async () => {
        expect(
          await screen.findByTestId(templatesEditPageTestId)
        ).toBeInTheDocument();
      });
    });

    it('should render new version form template metadata page', async () => {
      renderComponent({
        pathname: '/templates/:templateId/version/:templateVersionId',
      });
      await act(async () => {
        expect(
          await screen.findByTestId(templatesNewVersionPageTestId)
        ).toBeInTheDocument();
      });
    });

    it('should render folder page', async () => {
      renderComponent({
        pathname: '/templates/:id/activities/:templateVersionId',
      });
      await act(async () => {
        expect(await screen.findByTestId(folderPageTestId)).toBeInTheDocument();
      });
    });

    it('should render activity settings page', async () => {
      renderComponent({
        pathname: '/templates/:id/activity-settings/:templateVersionId',
      });
      await act(async () => {
        expect(
          await screen.findByTestId(activitySettingsPageTestId)
        ).toBeInTheDocument();
      });
    });

    it('should render search page', async () => {
      renderComponent({ pathname: '/templates/:id/search/:templateVersionId' });
      await act(async () => {
        expect(await screen.findByTestId(searchPageTestId)).toBeInTheDocument();
      });
    });

    it('should render templates page', async () => {
      renderComponent({ pathname: '/templates' });
      await act(async () => {
        expect(
          await screen.findByTestId(templatesPageTestId)
        ).toBeInTheDocument();
      });
    });

    it('should redirect to templates page', async () => {
      renderComponent({ pathname: '/' });
      await act(async () => {
        expect(
          await screen.findByTestId(templatesPageTestId)
        ).toBeInTheDocument();
      });
    });
  });

  describe('When a route is protected and the user has not logged in', () => {
    it('should redirect the user to the Login screen', () => {
      mockedProtectedRoutesHelper.mockClear();
      renderComponent({
        pathname: '/templates/:id/activities/:templateVersionId',
      });
      const loginNode = screen.getByText(/Login/i);
      expect(loginNode).toBeInTheDocument();
    });
  });
});
