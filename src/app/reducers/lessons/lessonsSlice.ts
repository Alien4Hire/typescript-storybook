import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

import { data as initialItems } from '../../../components/FolderNavigator/sampleData';
import { RootState } from '../../store';
import FolderTree, {
  addParentIdToFolders,
  FolderMoveDirectionT,
  FolderT,
  getNodeById,
} from '../../../util/folderTree';
import { TemplateNodeOrderT } from '../../../../../app/types/templateNodes';

export type ResourceT = {
  id: string;
  name: string;
  type: string;
  // TODO: complete when know the content of an activity
};

export interface LessonStateI {
  items: FolderT;
  selected: string[];
  expanded: string[];
  reorderedItems: TemplateNodeOrderT[];
  canReorganize: boolean;
  reorganizeMode: boolean;
}

export const initialState: LessonStateI = {
  items: {
    id: '0',
    name: 'Root',
    type: 'root',
    children: [],
  },
  selected: [],
  expanded: [],
  reorderedItems: [],
  canReorganize: false,
  reorganizeMode: false,
};

export const lessonsSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {
    // getInitialLessons is temp until wired up with RTKquery
    getInitialLessons: (state) => {
      const currentItems = current(state.items);
      const itemsExist = currentItems.children?.length;
      state.items = itemsExist
        ? state.items
        : addParentIdToFolders(initialItems as FolderT);
    },
    setLessons: (state, action: PayloadAction<FolderT>) => {
      state.items = action.payload;
    },
    selectFolderItem: (
      state,
      action: PayloadAction<{ checked: boolean; nodes: FolderT }>
    ) => {
      const { checked, nodes } = action.payload;
      const selected = FolderTree.selectFolderItem(
        state.items,
        state.selected,
        checked,
        nodes
      );
      const canReorganize = FolderTree.computeCanReorganize(
        state.items,
        selected
      );
      state.selected = selected;
      state.canReorganize = canReorganize;
    },
    moveFolderItem: (state, action: PayloadAction<FolderMoveDirectionT>) => {
      const reorderedNodes: TemplateNodeOrderT[] = [];
      state.items = FolderTree.moveFolderItem(
        state.items,
        state.selected,
        action.payload,
        reorderedNodes
      );
      state.reorderedItems = [...reorderedNodes];
    },
    addFolderItem: (
      state,
      action: PayloadAction<Omit<FolderT, 'children'>>
    ) => {
      state.items = FolderTree.addFolderItem(state.items, action.payload);
    },
    addMultipleFolderItems: (
      state,
      action: PayloadAction<Omit<FolderT, 'children'>[]>
    ) => {
      state.items = FolderTree.addFolderItems(state.items, action.payload);
    },
    removeFolderItem: (
      state,
      action: PayloadAction<Omit<FolderT, 'children'>>
    ) => {
      state.items = FolderTree.removeFolderItem(state.items, action.payload);
    },
    expandFolderItem: (state, action: PayloadAction<string[]>) => {
      const { expanded, selected } = FolderTree.expandFolderItem(
        state.items,
        state.selected,
        state.expanded,
        action.payload
      );
      state.expanded = expanded;
      state.selected = selected || state.selected;
    },
    setReorganizeMode: (state, action: PayloadAction<boolean>) => {
      state.reorganizeMode = action.payload;
    },
    exitEditMode: (state) => ({ ...state, selected: [] }),
  },
  extraReducers: {
    'login/logout': (state: any, action) => {
      state.items = initialState.items;
    },
  },
});

export const {
  getInitialLessons,
  selectFolderItem,
  moveFolderItem,
  addFolderItem,
  addMultipleFolderItems,
  removeFolderItem,
  expandFolderItem,
  setReorganizeMode,
  setLessons,
  exitEditMode,
} = lessonsSlice.actions;

export const getLessons = (state: RootState) => state.lessons;
export const getSelectedLessonsIds = (state: RootState) =>
  state.lessons.selected;
export const getSelectedLessons = (state: RootState) => {
  const { items: folders, selected } = state.lessons;
  const selectedActivities = [];

  for (let index = 0; index < selected.length; index++) {
    const activity = getNodeById(folders, selected[index]);
    if (activity)
      selectedActivities.push({
        id: activity.id,
        name: activity.name,
        type: activity.type,
      });
  }

  return selectedActivities;
};

export default lessonsSlice.reducer;
