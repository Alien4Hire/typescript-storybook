import { LessonsService, LessonsQueryParam } from './lessonsAPI';
import {
  TemplateNodeT,
  TemplateNodeOrderT,
} from '../../../../../app/types/templateNodes';
import fetchMock from 'jest-fetch-mock';
import { store } from '../../store';

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('Lessons Endpoint request', () => {
  describe('When listing all lessons', () => {
    test('Request should return status fulfilled', async () => {
      expect.assertions(3);
      fetchMock.mockResponse(JSON.stringify({ data: [] }));
      const param: LessonsQueryParam = {
        viewTypeId: '9cfad609-3119-4557-a2da-e2f03b2f56b5',
        templateId: '0540f52f-66ff-4ed0-9ab1-34819ba09b5b',
        templateVersionId: 'ed9067e8-1bb7-4204-9039-288c1801e399',
      };
      const { isSuccess, data, status } = await store.dispatch(
        LessonsService.endpoints.getLessons.initiate(param)
      );
      expect(status).toBe('fulfilled');
      expect(isSuccess).toBe(true);
      expect(data).toStrictEqual({ data: [] });
    });
  });
  describe('When adding new folder', () => {
    test('should create new folder', async () => {
      const newFolder: TemplateNodeT = {
        templateViewTypeId: '9cfad609-3119-4557-a2da-e2f03b2f56b5',
        templateId: '0540f52f-66ff-4ed0-9ab1-34819ba09b5b',
        templateVersionId: 'ed9067e8-1bb7-4204-9039-288c1801e399',
        parentNodeId: '0540f52f-66ff-4ed0-9ab1-34819ba09b5c',
        name: 'new folder',
      };
      fetchMock.mockResponse(JSON.stringify(newFolder));
      return store
        .dispatch(LessonsService.endpoints.addFolder.initiate(newFolder))
        .then((action: any) => {
          const { data } = action;
          expect(data).toStrictEqual(newFolder);
        });
    });
  });
  describe('When moving the folders', () => {
    test('should reorder folders', async () => {
      const reorderedItems: TemplateNodeOrderT[] = [
        {
          id: '0540f52f-66ff-4ed0-9ab1-34819ba09b5b',
          sequence: 1,
        },
        {
          id: '0540f52f-66ff-4ed0-9ab1-34819ba09b5c',
          sequence: 2,
        },
      ];
      fetchMock.mockResponse(JSON.stringify(reorderedItems));
      return store
        .dispatch(
          LessonsService.endpoints.reorderItems.initiate(reorderedItems)
        )
        .then((action: any) => {
          const { data } = action;
          expect(data).toStrictEqual(reorderedItems);
        });
    });
  });
});
