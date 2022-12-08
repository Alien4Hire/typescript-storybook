import { LearningObjectivesT } from '../../../../../app/types/learningObjectives';
import { apiBase } from '../../api';

export const LearningObjectiveService = apiBase.injectEndpoints({
  endpoints: (builder) => ({
    getLearningObjectives: builder.query<LearningObjectivesT[], undefined>({
      query: () => ({
        url: '/learningobjectives',
      }),
      providesTags: ['LearningObjectives'],
    }),
  }),
});

export const { useGetLearningObjectivesQuery } = LearningObjectiveService;
