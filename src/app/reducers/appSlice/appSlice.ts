import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertColor } from '@mui/material/Alert';

import { RootState } from '../../store';

export type ToastNotificationT = {
  open: boolean;
  message: string;
  type: AlertColor;
};
export interface AppStateI {
  isTemplateHeader: boolean;
  isSidebarOpen: boolean;
  toastNotification: ToastNotificationT;
}

const initialState: AppStateI = {
  isTemplateHeader: false,
  isSidebarOpen: true,
  toastNotification: {
    open: false,
    message: '',
    type: 'error',
  },
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setHeader: (state, action) => {
      state.isTemplateHeader = action.payload;
    },
    setSidebarStatus: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
    setToastNotification: (
      state,
      action: PayloadAction<ToastNotificationT>
    ) => {
      state.toastNotification = action.payload;
    },
    resetToastNotification: (state) => {
      state.toastNotification = initialState.toastNotification;
    },
  },
});

export const {
  setHeader,
  setSidebarStatus,
  setToastNotification,
  resetToastNotification,
} = appSlice.actions;

export const selectCurrentHeader = (state: RootState) =>
  state.app.isTemplateHeader;

export const getSideBarStatus = (state: RootState) => state.app.isSidebarOpen;

export const getToastNotification = (state: RootState) =>
  state.app.toastNotification;

export default appSlice.reducer;
