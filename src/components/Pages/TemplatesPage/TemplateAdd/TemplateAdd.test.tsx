/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { MemoryRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import user from '@testing-library/user-event';
import TemplateAdd from './TemplateAdd';
import fetchMock from 'jest-fetch-mock';
import { useAddTemplateMutation } from '../../../../app/reducers/templates/templateAPI';
import { setupStore } from '../../../../app/store';
import { theme } from '../../../../theme';
import { act, renderHook } from '@testing-library/react-hooks';
import {
  templates,
  productModelsAPIResponseMock,
  learningObjectivesAPIResponseMock,
  taxonomiesAPIResponseMock,
} from '../sampleData';
import { useGetTaxonomiesQuery } from '../../../../app/reducers/taxonomies/taxonomiesAPI';
import { useGetProductModelsQuery } from '../../../../app/reducers/productModels/productModelsAPI';
import { useGetLearningObjectivesQuery } from '../../../../app/reducers/learningObjectives/learningObjectivesApi';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('../../../../app/reducers/learningObjectives/learningObjectivesApi');
const mockedLearningObjectivesQuery =
  useGetLearningObjectivesQuery as jest.Mock;

jest.mock('../../../../app/reducers/productModels/productModelsAPI');
const mockedUseGetProductModelsQuery = useGetProductModelsQuery as jest.Mock;

jest.mock('../../../../app/reducers/taxonomies/taxonomiesAPI');
const mockedUseGetTaxonomiesQuery = useGetTaxonomiesQuery as jest.Mock;

beforeEach((): void => {
  fetchMock.resetMocks();
  jest.clearAllMocks();

  mockedUseGetTaxonomiesQuery.mockReset();
  mockedUseGetTaxonomiesQuery.mockReturnValue({
    data: taxonomiesAPIResponseMock,
  });

  mockedLearningObjectivesQuery.mockReset();
  mockedLearningObjectivesQuery.mockReturnValue({
    data: learningObjectivesAPIResponseMock,
  });

  mockedUseGetProductModelsQuery.mockReset();
  mockedUseGetProductModelsQuery.mockReturnValue({
    data: productModelsAPIResponseMock,
  });
});

type WrapperParamT = {
  children: React.ReactNode;
};

const wrapper = ({ children }: WrapperParamT) => {
  const store = setupStore();
  return (
    <Provider store={store}>
      <Router>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </StyledEngineProvider>
      </Router>
    </Provider>
  );
};

const renderComponent = () => {
  const store = setupStore();
  return render(
    <Provider store={store}>
      <Router>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <TemplateAdd />
          </ThemeProvider>
        </StyledEngineProvider>
      </Router>
    </Provider>
  );
};
//Integration test example
describe('<TemplateAdd. />', () => {
  test('Component <TemplateAdd /> render without crashing', () => {
    fetchMock.mockResponse(JSON.stringify([]));
    const view = renderComponent();
    expect(view).toMatchSnapshot();
  });

  test('Component <TemplateAdd /> should render a form with title Template Setup', () => {
    fetchMock.mockResponse(JSON.stringify([]));
    const { getByText } = renderComponent();
    expect(getByText(/Template Setup/i)).toBeInTheDocument();
  });

  test('Component <TemplateAdd /> should render input field TemplateName', () => {
    fetchMock.mockResponse(JSON.stringify([]));
    const { getByPlaceholderText } = renderComponent();
    const inputTemplateName = getByPlaceholderText(/Enter Template Name/i);
    expect(inputTemplateName).toBeInTheDocument();
  });

  test('Component <TemplateAdd /> should redirect to /templates on cancel button click', () => {
    fetchMock.mockResponse(JSON.stringify([]));
    const { getByText } = renderComponent();
    const cancelButton = getByText(/Cancel/i);
    user.click(cancelButton);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/templates');
  });

  test('Component <TemplateAdd /> should receive successfully response from server', async () => {
    const { getByText } = renderComponent();

    const mockTemplate = templates[0].versions[0];
    fetchMock.mockResponse(JSON.stringify(mockTemplate));

    const saveButton = getByText(/CREATE TEMPLATE/i);

    user.click(saveButton);
    const { result, waitForNextUpdate } = renderHook(
      () => useAddTemplateMutation(undefined),
      { wrapper }
    );

    const [addTemplate, initialResponse] = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(false);

    act(() => {
      void addTemplate(mockTemplate);
    });

    const loadingResponse = result.current[1];
    expect(loadingResponse.data).toBeUndefined();
    expect(loadingResponse.isLoading).toBe(true);

    await waitForNextUpdate({ timeout: 100 });

    const loadedResponse = result.current[1];
    expect(loadedResponse.data).not.toBeUndefined();
    expect(loadedResponse.isLoading).toBe(false);
    expect(loadedResponse.isSuccess).toBe(true);
  });
});
