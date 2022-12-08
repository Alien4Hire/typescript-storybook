import { TaxonomyT } from '../../../../../app/types/taxonomies';
import { apiBase } from '../../api';

export const TaxonomiesService = apiBase.injectEndpoints({
  endpoints: (builder) => ({
    getTaxonomies: builder.query<TaxonomyT[], undefined>({
      query: () => ({
        url: '/taxonomies',
      }),
      providesTags: ['Taxonomies'],
    }),
  }),
});

export const { useGetTaxonomiesQuery } = TaxonomiesService;
