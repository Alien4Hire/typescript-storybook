/* eslint-disable testing-library/prefer-screen-queries */
import { Provider } from 'react-redux';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { MemoryRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import user from '@testing-library/user-event';
import TemplateEdit from './TemplateEdit';
import {
  useUpdateTemplateMutation,
  useGetTemplateQuery,
} from '../../../../app/reducers/templates/templateAPI';
import { setupStore } from '../../../../app/store';
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

jest.mock('../../../../app/reducers/templates/templateAPI');
const mockeduseUpdateTemplateMutation = useUpdateTemplateMutation as jest.Mock;
const mockedUseGetTemplateQuery = useGetTemplateQuery as jest.Mock;

jest.mock('../../../../app/reducers/learningObjectives/learningObjectivesApi');
const mockedLearningObjectivesQuery =
  useGetLearningObjectivesQuery as jest.Mock;

jest.mock('../../../../app/reducers/productModels/productModelsAPI');
const mockedUseGetProductModelsQuery = useGetProductModelsQuery as jest.Mock;

jest.mock('../../../../app/reducers/taxonomies/taxonomiesAPI');
const mockedUseGetTaxonomiesQuery = useGetTaxonomiesQuery as jest.Mock;

const mockTemplate = templates[0].versions[0];
const mockUser = {
  user: {
    googleId: 'googleId',
    firstName: 'mockFirstName',
    lastName: 'mockLastName',
  },
};

beforeEach((): void => {
  jest.clearAllMocks();
  mockedUseGetTemplateQuery.mockReturnValue({ data: mockTemplate });

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
  const store = setupStore({ login: mockUser });
  return render(
    <Provider store={store}>
      <Router>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <TemplateEdit />
          </ThemeProvider>
        </StyledEngineProvider>
      </Router>
    </Provider>
  );
};

describe('<TemplateEdit/>', () => {
  test('Component <TemplateEdit /> render a template without crashing', () => {
    const updateTemplateMock = jest.fn();
    const response = {};
    mockeduseUpdateTemplateMutation.mockReturnValueOnce([
      updateTemplateMock,
      response,
    ]);
    const view = renderComponent();
    expect(view).toMatchSnapshot();
  });

  test('Component <TemplateEdit /> render template name correctly', async () => {
    const updateTemplateMock = jest.fn();
    const response = {};
    mockeduseUpdateTemplateMutation.mockReturnValueOnce([
      updateTemplateMock,
      response,
    ]);
    const { getByText } = renderComponent();
    expect(
      getByText(`Edit Template: ${mockTemplate.templateVersionName}`)
    ).toBeInTheDocument();
  });

  test('Component <TemplateEdit /> click on cancel redirect to /templates', () => {
    const updateTemplateMock = jest.fn();
    const response = {};
    mockeduseUpdateTemplateMutation.mockReturnValueOnce([
      updateTemplateMock,
      response,
    ]);
    const { getByText } = renderComponent();
    const cancelButton = getByText(/Cancel/i);
    user.click(cancelButton);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/templates');
  });

  test('Component <TemplateEdit /> click on SAVE CHANGES succesfully', async () => {
    const updateTemplateMock = jest.fn();
    const response = {};
    mockeduseUpdateTemplateMutation.mockReturnValue([
      updateTemplateMock,
      response,
    ]);
    const { getByText } = renderComponent();
    const saveButton = getByText(/SAVE CHANGES/i);
    const editTemplate = {
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
    user.click(saveButton);
    expect(updateTemplateMock).toHaveBeenNthCalledWith(1, editTemplate);
  });
});
