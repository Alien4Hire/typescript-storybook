import { TaxonomiesService } from './taxonomiesAPI';
import fetchMock from 'jest-fetch-mock';
import { store } from '../../store';

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('Taxonomies Endpoint request', () => {
  describe('When listing all product models', () => {
    test('Request should return status fulfilled', async () => {
      expect.assertions(3);
      fetchMock.mockResponse(JSON.stringify({ data: [] }));
      const { isSuccess, data, status } = await store.dispatch(
        TaxonomiesService.endpoints.getTaxonomies.initiate(undefined)
      );
      expect(status).toBe('fulfilled');
      expect(isSuccess).toBe(true);
      expect(data).toStrictEqual({ data: [] });
    });
  });
});
