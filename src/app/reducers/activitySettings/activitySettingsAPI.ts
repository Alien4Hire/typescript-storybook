import { UUID } from '../../../../../app/types';
import { ActivitySettingT } from '../../../../../app/types/activitySettings';
import { apiBase } from '../../api';

type ActivitySettingQueryT = {
  templateId: UUID | undefined;
  templateVersionId: UUID | undefined;
};

type AssignActivityResponseT = {
  id: string;
  template_node_content_id: string;
  name: string;
  description: string;
  activity_settings_id: string;
  createdAt: string;
  updatedAt: string;
}[];

type AssignActivityT = {
  activitySettingId: string;
  templateNodeIds: string[];
};

export const ActivitySettingsService = apiBase.injectEndpoints({
  endpoints: (builder) => ({
    getActivitySettings: builder.query<
      ActivitySettingT[],
      ActivitySettingQueryT
    >({
      query: ({ templateId, templateVersionId }) => ({
        url: `/activitysettings/${templateId}/version/${templateVersionId}`,
      }),
      providesTags: ['ActivitySettings'],
    }),
    addActivitySetting: builder.mutation<ActivitySettingT, ActivitySettingT>({
      query: ({ templateId, templateVersionId, ...activitySetting }) => ({
        url: `/activitysettings/${templateId}/version/${templateVersionId}`,
        method: 'POST',
        body: activitySetting,
        invalidatesTags: ['ActivitySettings'],
      }),
    }),
    deleteActivitySetting: builder.mutation<ActivitySettingT, string>({
      query: (activitySettingId) => ({
        url: `/activitysettings/${activitySettingId}`,
        method: 'DELETE',
        invalidatesTags: ['ActivitySettings'],
      }),
    }),
    assignActivities: builder.mutation<
      AssignActivityResponseT,
      AssignActivityT
    >({
      query: ({ activitySettingId, templateNodeIds }) => ({
        url: `/activitysettings/${activitySettingId}`,
        method: 'PUT',
        body: { templateNodeIds },
      }),
      invalidatesTags: ['ActivitySettings'],
    }),
  }),
});

export const {
  useGetActivitySettingsQuery,
  useAddActivitySettingMutation,
  useDeleteActivitySettingMutation,
  useAssignActivitiesMutation,
} = ActivitySettingsService;
