import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export type ResultItemT = {
  checkedValue?: string;
  checked: boolean;
  activityName: string;
  contentId: string;
  modifiedDate: string;
  addedToLibrary: boolean;
};

export interface SearchStateI {
  resultList: ResultItemT[];
  allCheckedStatus: boolean;
  indeterminateStatus: boolean;
}

export const initialState: SearchStateI = {
  resultList: [],
  allCheckedStatus: false, // allCheckedStatus to determine SelectAll State
  indeterminateStatus: false, // indeterminateStatus to determine SelectAll indeterminate State
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setResultList: (state, action: PayloadAction<ResultItemT[]>) => {
      const resultList = action.payload;
      state.resultList = resultList.map(
        ({ activityName, contentId, modifiedDate }) => ({
          contentId,
          activityName,
          modifiedDate,
          checked: false,
          addedToLibrary: false,
        })
      );
      state.allCheckedStatus = initialState.allCheckedStatus;
      state.indeterminateStatus = initialState.indeterminateStatus;
    },
    setChecked: (state, action: PayloadAction<string>) => {
      const localResult = state.resultList;
      const idx = localResult.findIndex(
        (el) => el.contentId === action.payload
      );

      state.resultList = [
        ...localResult.slice(0, idx),
        { ...localResult[idx], checked: !localResult[idx].checked },
        ...localResult.slice(idx + 1, localResult.length),
      ];

      if (state.resultList.every((el) => el.checked)) {
        state.allCheckedStatus = true;
        state.indeterminateStatus = false;
      } else {
        state.indeterminateStatus = state.resultList.some((el) => el.checked);
        state.allCheckedStatus = false;
      }
    },
    setAllChecked: (state) => {
      const localResult = state.resultList;
      state.allCheckedStatus = !state.allCheckedStatus;
      state.resultList = localResult.map((res) => ({
        ...res,
        checked: state.allCheckedStatus,
      }));
      state.indeterminateStatus = false;
    },
    addResourceToLibrary: (state, action: PayloadAction<string>) => {
      const localResult = state.resultList;
      const idx = localResult.findIndex(
        (el) => el.contentId === action.payload
      );

      state.resultList = [
        ...localResult.slice(0, idx),
        {
          ...localResult[idx],
          addedToLibrary: !localResult[idx].addedToLibrary,
        },
        ...localResult.slice(idx + 1, localResult.length),
      ];
    },
    addSelectedResourcesToLibrary: (state) => {
      const localResult = state.resultList;

      state.resultList = localResult.map((res) =>
        res.checked ? { ...res, addedToLibrary: true } : res
      );
    },
  },
  extraReducers: {
    'login/logout': (state: any) => {
      state.resultList = initialState.resultList;
      state.allCheckedStatus = initialState.allCheckedStatus;
      state.indeterminateStatus = initialState.indeterminateStatus;
    },
  },
});

export const {
  setResultList,
  setChecked,
  setAllChecked,
  addResourceToLibrary,
  addSelectedResourcesToLibrary,
} = searchSlice.actions;

export const getSearchResults = (state: RootState) => state.search;

export const getSelectedResults = (state: RootState) =>
  state.search.resultList.filter((el) => el.checked);

export default searchSlice.reducer;
