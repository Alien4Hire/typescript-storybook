import { apiBase } from '../../api';
import { ResultItemT } from './searchSlice';

export type ActivitiesQueryParam = {
  searchString: string;
  activitySettingsRule?: string;
  resourceType?: string;
  learningObjective?: string;
  from?: number;
  size?: number;
};

export const ActivitiesService = apiBase.injectEndpoints({
  endpoints: (builder) => ({
    getSearchResults: builder.query<ResultItemT[], ActivitiesQueryParam>({
      query: (queryParamForSearch) => {
        return {
          url: '/activity/search',
          method: 'POST',
          body: queryParamForSearch,
        };
      },
      providesTags: ['Activities'],
    }),
  }),
});

export const { useGetSearchResultsQuery } = ActivitiesService;
