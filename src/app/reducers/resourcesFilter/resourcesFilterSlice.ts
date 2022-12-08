import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';

export interface ResourceSearchStateI {
  isFilterOpen: boolean;
}

export const initialState: ResourceSearchStateI = {
  isFilterOpen: false,
};

export const resourcesFilterSlice = createSlice({
  name: 'resourcesFilter',
  initialState,
  reducers: {
    setIsFilterOpen: (state, action: PayloadAction<boolean>) => {
      state.isFilterOpen = action.payload;
    },
  },
});

export const { setIsFilterOpen } = resourcesFilterSlice.actions;

export const getFilterStatus = (state: RootState) =>
  state.resourcesFilter.isFilterOpen;

export default resourcesFilterSlice.reducer;
