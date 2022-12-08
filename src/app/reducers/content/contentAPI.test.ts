
import { ContentService } from './contentAPI';
import { ActivityUrlT } from '../../../../../app/types/content';
import fetchMock from 'jest-fetch-mock';
import { store } from '../../store';

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('Activity URL Save endpoint', () => {
  describe('Save activity url', () => {
    test('Request should return save url array', async () => {
      fetchMock.mockResponse(JSON.stringify(
        [
          {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            activityId: 'https://example-url-activity.com',
            name: 'Example URL Activity 1',
            tool: 'WEB_LINK'
          }
        ]
      ));
      const param: ActivityUrlT = {
        parentNodeId: 'd9fe0336-0a08-495c-8e26-0e6b6fcdd039',
        templateId: '9cfad609-3119-4557-a2da-e2f03b2f56b5',
        templateVersionId: '36add6b0-d7bb-4536-b523-772827968064',
        templateViewTypeId: 'd4fc4e46-b9e1-45ba-9a16-1c665fd8ce64',
        'activities': [
          {
            'activityId': 'https://example-url-activity.com',
            'name': 'Example URL Activity 1',
            'tool': 'WEB_LINK'
          }
        ]
      };
      const data = await store.dispatch(
        ContentService.endpoints.addContent.initiate(param)
      );
      expect(data).toEqual({
        data: [
          {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            activityId: 'https://example-url-activity.com',
            name: 'Example URL Activity 1',
            tool: 'WEB_LINK'
          }
        ]
      });
    });
  });
});
