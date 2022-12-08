import { store } from '../../store';
import configReducer, { ConfigStateI, getConfigAsync } from './configSlice';
import { getConfig } from './configApi';

jest.mock('./configApi');

describe('Config reducer', () => {
  const initialState: ConfigStateI = {
    status: 'idle',
    googleClientKey: undefined,
    integrationHubUrl: undefined,
  };

  it('should handle initial state', () => {
    expect(configReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('When calling getConfigAsync', () => {
    describe('When getConfigAsync is successfully called', () => {
      it('Should update the googleClientKey and integrationHubUrl', async () => {
        const mockGetConfig = getConfig as jest.MockedFunction<
          typeof getConfig
        >;
        mockGetConfig.mockResolvedValue({
          googleClientKey: 'mock-google-client-id',
          integrationHubUrl: 'http://mock-integration-hub-url/path',
        });

        const result = await store.dispatch(getConfigAsync());
        const configPayload = result.payload;
        const configState = store.getState().config;

        expect(result.type).toBe('config/initial/fulfilled');
        expect(configPayload.googleClientKey).toEqual('mock-google-client-id');
        expect(configPayload.integrationHubUrl).toEqual(
          'http://mock-integration-hub-url/path'
        );
        expect(configState).toEqual({
          status: 'idle',
          googleClientKey: 'mock-google-client-id',
          integrationHubUrl: 'http://mock-integration-hub-url/path',
        });
      });
    });

    describe('When getConfigAsync call fails', () => {
      it('Should not update the googleClientKey and return status of `failed`', async () => {
        const mockGetConfig = getConfig as jest.MockedFunction<
          typeof getConfig
        >;
        mockGetConfig.mockRejectedValue(new Error('failed'));

        const result = await store.dispatch(getConfigAsync());
        const configPayload = result.payload;
        const configState = store.getState().config;

        expect(result.type).toBe('config/initial/rejected');
        expect(configPayload).toBeUndefined();
        expect(configState).toEqual({
          status: 'failed',
          googleClientKey: 'not-configured',
          integrationHubUrl: 'not-configured',
        });
      });
    });
  });
});
