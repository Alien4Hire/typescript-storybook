import { ActivitiesService, ActivitiesQueryParam } from './searchAPI';
import fetchMock from 'jest-fetch-mock';
import { store } from '../../store';

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('Activities Search Endpoint request', () => {
  describe('When searching for activities', () => {
    test('Request should return status fulfilled', async () => {
      expect.assertions(3);
      fetchMock.mockResponse(JSON.stringify({ data: [] }));
      const param: ActivitiesQueryParam = {
        searchString: 'test',
      };
      const { isSuccess, data, status } = await store.dispatch(
        ActivitiesService.endpoints.getSearchResults.initiate(param)
      );
      expect(status).toBe('fulfilled');
      expect(isSuccess).toBe(true);
      expect(data).toStrictEqual({ data: [] });
    });
    test('Request should return status fulfilled when searching some text in activities', async () => {
      expect.assertions(3);
      fetchMock.mockResponse(JSON.stringify({ data: [] }));
      const param: ActivitiesQueryParam = {
        searchString: '',
        from: 0,
        size: 10,
      };
      const { isSuccess, data, status } = await store.dispatch(
        ActivitiesService.endpoints.getSearchResults.initiate(param)
      );
      expect(status).toBe('fulfilled');
      expect(isSuccess).toBe(true);
      expect(data).toStrictEqual({ data: [] });
    });
  });
});
