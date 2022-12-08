import { getConfig } from './configApi';
import fetchMock from 'jest-fetch-mock';

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('configApi', () => {
  describe('getConfig()', () => {
    const mockResponse = {
      googleClientKey: 'mock-google-client-key',
      integrationHubUrl: 'mock-integration-hub-url',
    };

    describe('When request is successful', () => {
      it('Should return config information when successful', async () => {
        fetchMock.mockResponse(JSON.stringify(mockResponse), { status: 200 });
        const response = await getConfig();
        expect(response).toStrictEqual(mockResponse);
      });
    });

    describe('When request is a non-200 response', () => {
      it('Should throw an error', async () => {
        expect.assertions(1);
        fetchMock.mockResponse(JSON.stringify({}), { status: 500 });
        try {
          await getConfig();
        } catch (e: any) {
          expect(e.message).toBe('something went wrong');
        }
      });
    });
  });
});
