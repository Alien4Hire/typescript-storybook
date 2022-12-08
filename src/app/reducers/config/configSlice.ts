import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { getConfig } from './configApi';

export interface ConfigStateI {
  status: string;
  googleClientKey: string | undefined;
  integrationHubUrl: string | undefined;
}

const initialState: ConfigStateI = {
  status: 'idle',
  googleClientKey: undefined,
  integrationHubUrl: undefined,
};

export const getConfigAsync = createAsyncThunk('config/initial', async () => {
  return await getConfig();
});

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    // None
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConfigAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getConfigAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const { googleClientKey, integrationHubUrl } = action.payload;
        state.googleClientKey = googleClientKey;
        state.integrationHubUrl = integrationHubUrl;
      })
      .addCase(getConfigAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.googleClientKey = 'not-configured';
        state.integrationHubUrl = 'not-configured';
      });
  },
});

export const selectGoogleClientKey = (state: RootState) =>
  state.config.googleClientKey;

export const selectIntegrationHubUrl = (state: RootState) =>
  state.config.integrationHubUrl;

export default configSlice.reducer;
