import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UUID } from '../../../../../app/types';

import { RootState } from '../../store';

export type ActivitySettingT = {
  // TODO: complete when know the content of an activity
  id: UUID;
  name: string;
  recommendedUse: 'none' | 'pre-class' | 'in-class' | 'post-class';
  studentVisibility: boolean;
  templateId: UUID;
};

export type ActivitySettingsReducerT = {
  all: ActivitySettingT[];
  selected: ActivitySettingT[];
};

const initialState: ActivitySettingsReducerT = {
  all: [],
  selected: [],
};

export const activitySettingsSlice = createSlice({
  name: 'resource',
  initialState,
  reducers: {
    setSettingsData: (state, action: PayloadAction<ActivitySettingT[]>) => {
      state.all = action.payload;
    },
    clearReducerData: (state) => {
      state = initialState;
    },
    clearSettingsSelection: (state) => {
      state.selected = initialState.selected;
    },
    addToSelectedSettings: (state, action: PayloadAction<ActivitySettingT>) => {
      const settingToAdd = action.payload;

      state.selected = [...state.selected, settingToAdd];
    },
    addMultipleToSelectedSettings: (
      state,
      action: PayloadAction<ActivitySettingT[]>
    ) => {
      const settingsToAdd = action.payload;
      state.selected = [...state.selected, ...settingsToAdd];
    },
    removeSelectedSetting: (state, action: PayloadAction<string>) => {
      const settingToRemoveId = action.payload;
      state.selected = state.selected.filter(
        (activity) => activity.id !== settingToRemoveId
      );
    },
    removeMultipleSelectedSettings: (
      state,
      action: PayloadAction<Array<string>>
    ) => {
      const idsToRemoveFromArray = action.payload;
      state.selected = state.selected.filter(
        (setting) => setting.id && !idsToRemoveFromArray.includes(setting.id)
      );
    },
  },
  extraReducers: {
    'login/logout': (state: any, action) => {
      state.all = initialState.all;
      state.selected = initialState.selected;
    },
  },
});

export const {
  setSettingsData,
  clearReducerData,
  clearSettingsSelection,
  addToSelectedSettings,
  addMultipleToSelectedSettings,
  removeSelectedSetting,
  removeMultipleSelectedSettings,
} = activitySettingsSlice.actions;

export const getAllResources = (state: RootState) => state.activitySettings.all;
export const getSelectedResources = (state: RootState) =>
  state.activitySettings?.selected || [];

export default activitySettingsSlice.reducer;
