import { FolderT } from '../../../util/folderTree';
import { apiBase } from '../../api';
import {
  TemplateNodeT,
  TemplateNodeOrderT,
} from '../../../../../app/types/templateNodes';

export type LessonsQueryParam = {
  templateId: string | undefined;
  viewTypeId: string | undefined;
  templateVersionId: string | undefined;
};

export const LessonsService = apiBase.injectEndpoints({
  endpoints: (builder) => ({
    getLessons: builder.query<FolderT[], LessonsQueryParam>({
      query: ({ templateId, viewTypeId, templateVersionId }) => {
        return {
          url: `/template/${templateId}/version/${templateVersionId}/views/${viewTypeId}/folders`,
        };
      },
      providesTags: ['Lessons'],
    }),
    addFolder: builder.mutation<TemplateNodeT, TemplateNodeT>({
      query: (folder) => ({
        url: '/folders',
        method: 'POST',
        body: folder,
      }),
    }),
    reorderItems: builder.mutation<TemplateNodeOrderT[], TemplateNodeOrderT[]>({
      query: (payload) => ({
        url: '/folders/reorder',
        method: 'PUT',
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetLessonsQuery,
  useAddFolderMutation,
  useReorderItemsMutation,
} = LessonsService;
