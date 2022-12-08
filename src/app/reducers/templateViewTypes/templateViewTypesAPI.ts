import { TemplateViewTypeT } from '../../../../../app/types/templateViewTypes';
import { apiBase } from '../../api';

export const TemplateViewTypesService = apiBase.injectEndpoints({
  endpoints: (builder) => ({
    getTemplateViewTypes: builder.query<TemplateViewTypeT[], undefined>({
      query: () => ({
        url: '/templateviewtypes',
      }),
      providesTags: ['TemplateViewTypes'],
    }),
  }),
});

export const { useGetTemplateViewTypesQuery } = TemplateViewTypesService;
