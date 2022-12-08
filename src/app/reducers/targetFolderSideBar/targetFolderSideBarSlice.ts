import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FolderT } from '../../../util/folderTree';

import { RootState } from '../../store';

type ExpandedItemT = {
  [id: string]: boolean;
};
export interface TargetFolderSideBarI {
  isSideBarOpen: boolean;
  selectedFolder: FolderT | null;
  expandedFolders: ExpandedItemT;
}

const initialState: TargetFolderSideBarI = {
  isSideBarOpen: false,
  selectedFolder: null,
  expandedFolders: {},
};

const targetFolderSideBarSlice = createSlice({
  name: 'targetFolderSideBar',
  initialState,
  reducers: {
    setIsSideBarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSideBarOpen = action.payload;
    },
    setSelectedFolder: (state, action: PayloadAction<FolderT | null>) => {
      state.selectedFolder = action.payload;
    },
    resetTargetFolderSideBarState: () => initialState,
    setExpandedFolder: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.expandedFolders[id] !== null
        ? (state.expandedFolders[id] = !state.expandedFolders[id])
        : (state.expandedFolders[id] = true);
    },
  },
});

export const {
  setIsSideBarOpen,
  setSelectedFolder,
  resetTargetFolderSideBarState,
  setExpandedFolder,
} = targetFolderSideBarSlice.actions;

export const getTargetSideBarStatus = (state: RootState) =>
  state.targetFolderSideBar.isSideBarOpen;

export const getSelectedFolder = (state: RootState) =>
  state.targetFolderSideBar.selectedFolder;

export const getExpandedFolders = (state: RootState) =>
  state.targetFolderSideBar.expandedFolders;

export default targetFolderSideBarSlice.reducer;
