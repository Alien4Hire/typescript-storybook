import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import configReducer from './reducers/config/configSlice';
import loginReducer from './reducers/login/loginSlice';
import activitySettingsReducer from './reducers/activitySettings/activitySettingsSlice';
import lessonsReducer from './reducers/lessons/lessonsSlice';
import searchReducer from './reducers/search/searchSlice';
import resourceFilterReducer from './reducers/resourcesFilter/resourcesFilterSlice';
import templateReducer from './reducers/templates/templateSlice';
import appReducer from './reducers/appSlice/appSlice';
import templateViewTypesReducer from './reducers/templateViewTypes/templateViewTypesSlice';
import targetFolderSideBarReducer from './reducers/targetFolderSideBar/targetFolderSideBarSlice';

import { setupListeners } from '@reduxjs/toolkit/query/react';
import { apiBase } from './api';

const rootReducer = combineReducers({
  config: configReducer,
  login: loginReducer,
  activitySettings: activitySettingsReducer,
  lessons: lessonsReducer,
  templates: templateReducer,
  search: searchReducer,
  resourcesFilter: resourceFilterReducer,
  app: appReducer,
  templateViewTypes: templateViewTypesReducer,
  targetFolderSideBar: targetFolderSideBarReducer,
  [apiBase.reducerPath]: apiBase.reducer,
});

// Use also for store setup in jest unit tests
// Use-case: unit test needs preloadedState
// Example: client/src/components/Pages/LoginPage/LoginPage.test.tsx
export const setupStore = (preloadedState: object = {}) => {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiBase.middleware),
    preloadedState,
  });
};

export const store = setupStore();

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
