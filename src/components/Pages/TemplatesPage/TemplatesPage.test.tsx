import { Provider } from 'react-redux';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { MemoryRouter as Router } from 'react-router-dom';
import { renderHook } from '@testing-library/react-hooks';
import fetchMock from 'jest-fetch-mock';
import { render } from '@testing-library/react';
import { useGetTemplatesQuery } from '../../../app/reducers/templates/templateAPI';
import { setupStore } from '../../../app/store';
import { theme } from '../../../theme';
import React from 'react';
import TemplatesPage from '.';
import { templates } from './sampleData';
import * as LessonsSlice from '../../../app/reducers/lessons/lessonsSlice';
import * as TemplatesSlice from '../../../app/reducers/templates/templateSlice';
import * as TemplateViewTypeSlice from '../../../app/reducers/templateViewTypes/templateViewTypesSlice';
import * as TargetFolderSideBarSlice from '../../../app/reducers/targetFolderSideBar/targetFolderSideBarSlice';

beforeEach((): void => {
  fetchMock.resetMocks();
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

const templateList = templates.slice(0, 9);

const renderComponent = () => {
  const store = setupStore({
    templates: {
      templateListResult: {
        1: templateList,
      },
    },
  });
  return render(
    <Provider store={store}>
      <Router>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <TemplatesPage />
          </ThemeProvider>
        </StyledEngineProvider>
      </Router>
    </Provider>
  );
};

describe('<TemplatePage />', () => {
  describe('default component behavior', () => {
    it('Should match snapshot', () => {
      fetchMock.mockResponse(JSON.stringify([]));
      const view = renderComponent();
      return expect(view).toMatchSnapshot();
    });

    it('Should reset Folder edit mode, unset template, unset selected view type, reset reorganize mode, and reset sidebar', () => {
      const spyExitEditMode = jest.spyOn(LessonsSlice, 'exitEditMode');
      const spySetReorganizeMode = jest.spyOn(
        LessonsSlice,
        'setReorganizeMode'
      );
      const spySetTemplate = jest.spyOn(TemplatesSlice, 'setTemplate');
      const spySetSelectedViewType = jest.spyOn(
        TemplateViewTypeSlice,
        'setSelectedViewType'
      );
      const spyResetTargetFolderSideBarState = jest.spyOn(
        TargetFolderSideBarSlice,
        'resetTargetFolderSideBarState'
      );
      fetchMock.mockResponse(JSON.stringify([]));
      renderComponent();
      expect(spyExitEditMode).toBeCalledTimes(1);
      expect(spySetTemplate).toBeCalledTimes(1);
      expect(spySetSelectedViewType).toBeCalledTimes(1);
      expect(spySetReorganizeMode).toBeCalledTimes(1);
      expect(spyResetTargetFolderSideBarState).toBeCalledTimes(1);
    });
  });

  test('<TemplatePage /> successfully retrieve list of templates', async () => {
    fetchMock.mockResponse(JSON.stringify([]));
    const { result, waitForNextUpdate } = renderHook(
      () => useGetTemplatesQuery({ page: 1, pageSize: 10 }),
      { wrapper }
    );
    const initialResponse = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(true);
    await waitForNextUpdate({ timeout: 500 });
    const nextResponse = result.current;
    expect(nextResponse.data).not.toBeUndefined();
    expect(nextResponse.isLoading).toBe(false);
    expect(nextResponse.isSuccess).toBe(true);
  });

  test('<TemplatePage /> Error in rendering list of templates', async () => {
    fetchMock.mockReject(new Error('Server Internal Error'));
    const { result, waitForNextUpdate } = renderHook(
      () => useGetTemplatesQuery({ page: 1, pageSize: 10 }),
      { wrapper }
    );
    const initialResponse = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(true);
    await waitForNextUpdate({ timeout: 500 });
    const nextResponse = result.current;
    expect(nextResponse.data).toBeUndefined();
    expect(nextResponse.isLoading).toBe(false);
    expect(nextResponse.isError).toBe(true);
  });
  //TODO:Test alert is some alert component is loaded when error
  //TODO:Test it was rendered <TemplateListItem/> correctly
});
