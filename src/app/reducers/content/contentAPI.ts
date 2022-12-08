import { responseUrlT , ActivityUrlT } from '../../../../../app/types/content';
import { apiBase } from '../../api';

export const ContentService = apiBase.injectEndpoints({
  endpoints: (builder) => ({
    addContent: builder.mutation<responseUrlT[], ActivityUrlT>({
      query: (content) => ({
        url: '/content',
        method: 'POST',
        body: content,
      }),
      invalidatesTags: ['Content', 'Lessons'],
    }),
  }),
});

export const { useAddContentMutation } = ContentService;
