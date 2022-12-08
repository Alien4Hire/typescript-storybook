import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { TemplateViewTypeT } from '../../../../../app/types/templateViewTypes';

const DEFAULT_TEMPLATE_VIEW_TYPE = 'Resource Structure';

export interface TemplateViewTypesStateI {
  types: TemplateViewTypeT[];
  selected: TemplateViewTypeT | undefined;
}

export const initialState: TemplateViewTypesStateI = {
  types: [],
  selected: undefined,
};

export const templateViewTypesSlice = createSlice({
  name: 'templateViewTypes',
  initialState,
  reducers: {
    setTemplateViewTypes: (
      state,
      action: PayloadAction<TemplateViewTypeT[]>
    ) => {
      state.types = action.payload;
    },
    setSelectedViewType: (
      state,
      action: PayloadAction<TemplateViewTypeT | undefined>
    ) => {
      state.selected = action.payload;
    },
  },
});

export const { setTemplateViewTypes, setSelectedViewType } =
  templateViewTypesSlice.actions;

export const getTemplateViewTypes = (state: RootState) =>
  state.templateViewTypes.types;

export const getSelectedTemplateViewType = (state: RootState) => {
  return (
    state.templateViewTypes.selected ||
    state.templateViewTypes.types.find(
      (type) => type.name === DEFAULT_TEMPLATE_VIEW_TYPE
    )
  );
};

export default templateViewTypesSlice.reducer;
