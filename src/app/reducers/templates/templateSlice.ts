import { createSlice } from '@reduxjs/toolkit';
import {
  MlTemplateVersionsT,
  TemplateRequestT,
} from '../../../../../app/types/templates';
import { RootState } from '../../store';

type TemplateListMapT = {
  [key: number]: MlTemplateVersionsT[];
};

type TemplateStateT = {
  template: TemplateRequestT | undefined;
  templateListResult: TemplateListMapT;
};

const initialState: TemplateStateT = {
  template: undefined,
  templateListResult: {},
};

const templateSlice = createSlice({
  name: 'templates',
  initialState,
  reducers: {
    setTemplate: (state, action) => {
      state.template = action.payload;
    },
    setTemplateListResult: (state, action) => {
      const { page, templates } = action.payload;
      // Restart infinite scroll if page is 1
      // Example: navigate away from template list, then back
      if (page === 1) {
        state.templateListResult = {};
      }
      state.templateListResult[page] = templates;
    },
  },
  extraReducers: {
    'login/logout': (state: any, action) => {
      state.template = undefined;
      state.templateListResult = {};
    },
  },
});

export const { setTemplate, setTemplateListResult } = templateSlice.actions;

export const selectCurrentTemplate = (state: RootState) =>
  state.templates.template;

export const selectTemplateList = (state: RootState) =>
  state.templates.templateListResult;

export default templateSlice.reducer;
