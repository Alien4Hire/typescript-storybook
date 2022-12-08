import { render, fireEvent, screen } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import TemplateFormPage, { MlTemplateFormPagePropsT } from './TemplateFormPage';
import {
  templates,
  productModelsAPIResponseMock,
  learningObjectivesAPIResponseMock,
  taxonomiesAPIResponseMock,
} from '../../sampleData';
import { theme } from '../../../../../theme';
import { setupStore } from '../../../../../app/store';
import { Provider } from 'react-redux';
import { useGetTaxonomiesQuery } from '../../../../../app/reducers/taxonomies/taxonomiesAPI';
import { useGetProductModelsQuery } from '../../../../../app/reducers/productModels/productModelsAPI';
import { useGetLearningObjectivesQuery } from '../../../../../app/reducers/learningObjectives/learningObjectivesApi';

jest.mock(
  '../../../../../app/reducers/learningObjectives/learningObjectivesApi'
);
const mockedLearningObjectivesQuery =
  useGetLearningObjectivesQuery as jest.Mock;

jest.mock('../../../../../app/reducers/productModels/productModelsAPI');
const mockedUseGetProductModelsQuery = useGetProductModelsQuery as jest.Mock;

jest.mock('../../../../../app/reducers/taxonomies/taxonomiesAPI');
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

const baseProps = {
  template: templates[0].versions[0],
  onSave: jest.fn(),
  onCancel: jest.fn(),
  title: 'Form Title',
};

const renderComponent = (customProps?: MlTemplateFormPagePropsT) => {
  const props = { ...baseProps, ...customProps };
  const store = setupStore();

  return render(
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <TemplateFormPage {...props} />
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  );
};

describe('<TemplateFormPage/>', () => {
  it('renders correctly', () => {
    const view = renderComponent();
    expect(view).toMatchSnapshot();
  });

  it('should call onCancel fn', () => {
    renderComponent();
    const cancelButton = screen.getByTestId('cancel-button');

    expect(baseProps.onCancel).not.toBeCalled();

    fireEvent.click(cancelButton);
    expect(baseProps.onCancel).toBeCalledTimes(1);
  });

  it('should call onSave fn', () => {
    renderComponent();
    const saveButton = screen.getByTestId('save-button');

    expect(baseProps.onSave).not.toBeCalled();

    fireEvent.click(saveButton);
    expect(baseProps.onSave).toBeCalledTimes(1);
  });

  it('should not allow empty template name field', () => {
    renderComponent();
    const saveButton = screen.getByTestId('save-button');
    const nameInput = screen.getByPlaceholderText('Enter Template Name');

    expect(baseProps.onSave).not.toBeCalled();

    fireEvent.change(nameInput, { target: { value: '' } });
    expect((nameInput as HTMLInputElement).value).toBe('');

    fireEvent.click(saveButton);
    expect(baseProps.onSave).toBeCalledTimes(0);
  });

  it('should not allow empty author field', () => {
    renderComponent();
    const saveButton = screen.getByTestId('save-button');
    const authorInput = screen.getByPlaceholderText('Enter Author');

    expect(baseProps.onSave).not.toBeCalled();

    fireEvent.change(authorInput, { target: { value: '' } });
    expect((authorInput as HTMLInputElement).value).toBe('');

    fireEvent.click(saveButton);
    expect(baseProps.onSave).toBeCalledTimes(0);
  });
});
