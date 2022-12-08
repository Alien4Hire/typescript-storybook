import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout, getCaTokenCookie } from './reducers/login/loginSlice';
import { setToastNotification } from './reducers/appSlice/appSlice';

export const baseUrl = process.env.REACT_APP_API || '/api/v1';

declare module '@reduxjs/toolkit/query' {
  interface FetchBaseQueryError {
    status: number;
    data:
    | {
      id?: string;
      location?: string;
      message: string;
      path?: string;
      status?: number;
      type?: string;
    }[]
    | {
      id?: string;
      location?: string;
      message: string;
      path?: string;
      status?: number;
      type?: string;
    };
  }
}

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = getCaTokenCookie();
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    headers.set('Content-Type', 'application/json;charset=UTF-8');
    return headers;
  },
});

const baseQueryWithErrorHandling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    if (result.error.status === 401) {
      api.dispatch(logout());
      /**
       * Instead of logging out when the token is invalid, it is possible to refresh the token here.
       */
      // try to get a new token
      // const refreshResult = await baseQuery('/refreshToken', api, extraOptions);
      // if (refreshResult.data) {
      //   // store the new token
      //   api.dispatch(setNewToken(refreshResult.data));
      //   // retry the initial query
      //   result = await baseQuery(args, api, extraOptions);
      // } else {
      //   api.dispatch(logout());
      // }
    } else {
      const message = Array.isArray(result.error?.data)
        ? result.error?.data[0]?.message
        : result.error?.data?.message;
      api.dispatch(
        setToastNotification({
          type: 'error',
          open: true,
          message,
        })
      );
    }
  }
  return result;
};

export const apiBase = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithErrorHandling,
  //List of tag associated with our data endpoints
  tagTypes: [
    'Templates',
    'ActivitySettings',
    'TemplateViewTypes',
    'ProductModels',
    'LearningObjectives',
    'Taxonomies',
    'Activities',
    'Lessons',
    'Content',
  ],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
