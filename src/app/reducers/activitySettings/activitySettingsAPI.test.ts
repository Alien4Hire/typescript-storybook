import { ActivitySettingsService } from './activitySettingsAPI';
import fetchMock from 'jest-fetch-mock';
import { store } from '../../store';
import { ActivitySettingT } from '../../../../../app/types/activitySettings';

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('Template Endpoint request', () => {
  it('should list all activity settings', async () => {
    expect.assertions(3);
    fetchMock.mockResponse(JSON.stringify({ data: [] }));
    const param = {
      templateId: 'mockTemplateId',
      templateVersionId: 'mockTemplateVersionId',
    };
    const { isSuccess, data, status } = await store.dispatch(
      ActivitySettingsService.endpoints.getActivitySettings.initiate(param)
    );
    expect(status).toBe('fulfilled');
    expect(isSuccess).toBe(true);
    expect(data).toStrictEqual({ data: [] });
  });

  it('should create a new Activity Setting', () => {
    const newActivitySetting = {
      name: 'Test Setting',
      recommendedUse: 'none',
      studentVisibility: true,
      templateId: 'aoksndoiasno',
    } as ActivitySettingT;
    fetchMock.mockResponse(JSON.stringify(newActivitySetting));

    return store
      .dispatch(
        ActivitySettingsService.endpoints.addActivitySetting.initiate(
          newActivitySetting
        )
      )
      .then((action: any) => {
        const { data } = action;
        expect(data).toStrictEqual(newActivitySetting);
      });
  });
  it('should delete an Activity Setting', () => {
    const deletedActivitySetting = {
      id: 'aoismoio',
      name: 'Test Setting',
      recommendedUse: 'none',
      studentVisibility: true,
      templateId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    } as ActivitySettingT;
    fetchMock.mockResponse(JSON.stringify(deletedActivitySetting));

    return store
      .dispatch(
        ActivitySettingsService.endpoints.deleteActivitySetting.initiate(
          '3fa85f64-5717-4562-b3fc-2c963f66afa6'
        )
      )
      .then((action: any) => {
        const { data } = action;
        expect(data).toStrictEqual(deletedActivitySetting);
      });
  });
  it('should assing an Activity Setting', () => {
    const activitySettingId = 'aoismoio';
    const templateNodeIds = ['aoindfaoi', 'iaosojih'];
    const activitySettingsList = [
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        template_node_content_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'string',
        description: 'string',
        activity_settings_id: 'string',
        createdAt: '2022-06-02T02:14:05.201Z',
        updatedAt: '2022-06-02T02:14:05.201Z',
      },
    ];
    fetchMock.mockResponse(JSON.stringify(activitySettingsList));

    return store
      .dispatch(
        ActivitySettingsService.endpoints.assignActivities.initiate({
          activitySettingId,
          templateNodeIds,
        })
      )
      .then((action: any) => {
        const { data } = action;
        expect(data).toStrictEqual(activitySettingsList);
      });
  });
});
