import { ProductModelsService } from './productModelsAPI';
import fetchMock from 'jest-fetch-mock';
import { store } from '../../store';

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('ProductModels Endpoint request', () => {
  describe('When listing all product models', () => {
    test('Request should return status fulfilled', async () => {
      expect.assertions(3);
      fetchMock.mockResponse(JSON.stringify({ data: [] }));
      const param = 'aoksndoiasno';
      const { isSuccess, data, status } = await store.dispatch(
        ProductModelsService.endpoints.getProductModels.initiate(param)
      );
      expect(status).toBe('fulfilled');
      expect(isSuccess).toBe(true);
      expect(data).toStrictEqual({ data: [] });
    });
  });
});
