import { LearningObjectiveService } from './learningObjectivesApi';
import fetchMock from 'jest-fetch-mock';
import { store } from '../../store';

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('Template Endpoint request', () => {
  describe('When listing all learning objectives', () => {
    test('Request should return status fulfilled', async () => {
      expect.assertions(3);
      fetchMock.mockResponse(JSON.stringify({ data: [] }));
      const { isSuccess, data, status } = await store.dispatch(
        LearningObjectiveService.endpoints.getLearningObjectives.initiate(
          undefined
        )
      );
      expect(status).toBe('fulfilled');
      expect(isSuccess).toBe(true);
      expect(data).toStrictEqual({ data: [] });
    });
    test('Request should return status error when not found learning objectives', async () => {
      expect.assertions(3);
      fetchMock.mockResponse(JSON.stringify({ data: [] }));
      const { isSuccess, data, status } = await store.dispatch(
        LearningObjectiveService.endpoints.getLearningObjectives.initiate(
          undefined
        )
      );
      expect(status).toBe('fulfilled');
      expect(isSuccess).toBe(true);
      expect(data).toStrictEqual({ data: [] });
    });
  });
});
