import {
  TemplateRequestT,
  SyncTemplateViewsRequestT,
} from '../../../../../app/types/templates';
import { apiBase } from '../../api';

export type TemplateQueryParam = {
  page: number;
  pageSize: number;
  searchString?: string;
};

export type TemplateVersionQueryParamT = {
  templateId: string | undefined;
  templateVersionId: string | undefined;
};

export const TemplateService = apiBase.injectEndpoints({
  endpoints: (builder) => ({
    getTemplates: builder.query<TemplateRequestT[], TemplateQueryParam>({
      query: ({ page, pageSize, searchString = '' }) => {
        const queryParamForSearch = searchString
          ? `&searchString=${searchString}`
          : '';
        return {
          url: `/templates?page=${page}&pageSize=${pageSize}${queryParamForSearch}`,
        };
      },
      providesTags: ['Templates'],
    }),
    getTemplate: builder.query<TemplateRequestT, TemplateVersionQueryParamT>({
      query: ({ templateId, templateVersionId }) => ({
        url: `/templates/${templateId}/version/${templateVersionId}`,
      }),
    }),
    updateTemplate: builder.mutation<TemplateRequestT, TemplateRequestT>({
      query: (template) => ({
        url: `/templates/${template.templateId}/version/${template.templateVersionId}`,
        method: 'PUT',
        body: template,
      }),
      invalidatesTags: ['Templates'],
    }),
    addTemplate: builder.mutation<TemplateRequestT, TemplateRequestT>({
      query: (template) => ({
        url: '/templates',
        method: 'POST',
        body: template,
        invalidatesTags: ['Templates'],
      }),
    }),
    copyTemplate: builder.mutation<TemplateRequestT, TemplateRequestT>({
      query: (template) => ({
        url: `/templates/${template.templateId}/copy/${template.templateVersionId}`,
        method: 'POST',
        body: template,
        invalidatesTags: ['Templates'],
      }),
    }),
    newVersionTemplate: builder.mutation<TemplateRequestT, TemplateRequestT>({
      query: (template) => ({
        url: `/templates/${template.templateId}/version/${template.templateVersionId}`,
        method: 'POST',
        body: template,
        invalidatesTags: ['Templates'],
      }),
    }),
    syncTemplateViews: builder.mutation<undefined, SyncTemplateViewsRequestT>({
      query: ({
        templateId,
        templateVersionId,
        templateViewTypeId,
        copyToTemplateViewTypeId,
      }) => ({
        url: `/templates/${templateId}/syncviews/${templateVersionId}`,
        method: 'POST',
        body: {
          templateViewTypeId,
          copyToTemplateViewTypeId,
        },
      }),
      invalidatesTags: ['Templates', 'Lessons'],
    }),
  }),
});

export const {
  useGetTemplatesQuery,
  useGetTemplateQuery,
  useUpdateTemplateMutation,
  useAddTemplateMutation,
  useCopyTemplateMutation,
  useNewVersionTemplateMutation,
  useSyncTemplateViewsMutation,
} = TemplateService;
