/* eslint-disable testing-library/prefer-screen-queries */
import { Provider } from 'react-redux';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { MemoryRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import user from '@testing-library/user-event';
import TemplateCopy from './TemplateCopy';
import {
  useCopyTemplateMutation,
  useGetTemplateQuery,
} from '../../../../app/reducers/templates/templateAPI';
import { store } from '../../../../app/store';
import { theme } from '../../../../theme';
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

jest.mock('../../../../app/reducers/templates/templateAPI');
const mockedUseCopyTemplateMutation = useCopyTemplateMutation as jest.Mock;
const mockedUseGetTemplateQuery = useGetTemplateQuery as jest.Mock;

const mockTemplate = templates[0].versions[0];

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

const renderComponent = () => {
  return render(
    <Provider store={store}>
      <Router>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <TemplateCopy />
          </ThemeProvider>
        </StyledEngineProvider>
      </Router>
    </Provider>
  );
};

describe('<TemplateCopy. />', () => {
  test('Component <TemplateCopy /> render a template without crashing', () => {
    mockedUseGetTemplateQuery.mockReturnValueOnce({ data: mockTemplate });
    const copyTemplateMock = jest.fn();
    const response = {};
    mockedUseCopyTemplateMutation.mockReturnValue([copyTemplateMock, response]);
    const view = renderComponent();
    expect(view).toMatchSnapshot();
  });

  test('Component <TemplateCopy /> render template name correctly', async () => {
    mockedUseGetTemplateQuery.mockReturnValueOnce({ data: mockTemplate });
    const copyTemplateMock = jest.fn();
    const response = {};
    mockedUseCopyTemplateMutation.mockReturnValue([copyTemplateMock, response]);
    const { getByText } = renderComponent();
    expect(
      getByText(`Create a copy of: ${mockTemplate.templateVersionName}`)
    ).toBeInTheDocument();
  });

  test('Component <TemplateCopy /> click on cancel redirect to /templates', () => {
    mockedUseGetTemplateQuery.mockReturnValue({ data: mockTemplate });
    const copyTemplateMock = jest.fn();
    const response = {};
    mockedUseCopyTemplateMutation.mockReturnValue([copyTemplateMock, response]);
    const { getByText } = renderComponent();
    const cancelButton = getByText(/Cancel/i);
    user.click(cancelButton);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/templates');
  });

  test('Component <TemplateCopy /> click on SAVE CHANGES succesfully', async () => {
    mockedUseGetTemplateQuery.mockReturnValueOnce({ data: mockTemplate });
    const copyTemplateMock = jest.fn();
    const response = { isError: false, isLoading: false, data: mockTemplate };
    mockedUseCopyTemplateMutation.mockReturnValueOnce([
      copyTemplateMock,
      response,
    ]);
    const { getByText } = renderComponent();
    const saveButton = getByText(/SAVE CHANGES/i);
    user.click(saveButton);
    const copyTemplate = {
      templateVersionName: mockTemplate.templateVersionName,
      templateName: mockTemplate.templateName,
      description: mockTemplate.description,
      learningObjectiveId: mockTemplate.learningObjectiveId,
      taxonomyId: mockTemplate.taxonomyId,
      isbn: mockTemplate.isbn,
      ebook: mockTemplate.ebook,
      bookAuthor: mockTemplate.bookAuthor,
      productModel: mockTemplate.productModel,
      productType: mockTemplate.productType,
      titleType: mockTemplate.titleType,
      templateId: mockTemplate.templateId,
      templateVersionId: mockTemplate.templateVersionId,
    };
    expect(copyTemplateMock).toHaveBeenNthCalledWith(1, copyTemplate);
  });
});
