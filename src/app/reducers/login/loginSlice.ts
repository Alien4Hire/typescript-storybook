import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
import { RootState } from '../../../app/store';
import { verifyGoogleUser } from './loginApi';

export type CaUserT = {
  id: string;
  mlIamId?: string;
  googleId?: string;
  firstName?: string;
  lastName?: string;
  token?: string;
  profilePhoto?: string;
};

export interface LoginStateI {
  user: CaUserT | undefined;
  status: 'idle' | 'loading' | 'failed';
}

export const getCaTokenCookie = () => {
  const cookies = new Cookies();
  return cookies.get('ca_token');
};

export const setCaTokenCookie = (token: string) => {
  const cookies = new Cookies();
  cookies.set('ca_token', token, { path: '/' });
};

export const removeCaTokenCookie = () => {
  const cookies = new Cookies();
  cookies.remove('ca_token');
};

const initialState: LoginStateI = {
  user: undefined,
  status: 'idle',
};

export const googleAuthAsync = createAsyncThunk(
  'login/googleAuth',
  async (token: string) => {
    return await verifyGoogleUser(token);
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
      // Signout: https://developers.google.com/identity/gsi/web/guides/automatic-sign-in-sign-out#sign-out
      google.accounts.id.disableAutoSelect();
      removeCaTokenCookie();
      state.status = 'idle';
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleAuthAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(googleAuthAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const { user, token } = action.payload;
        setCaTokenCookie(token);
        state.user = user;
      })
      .addCase(googleAuthAsync.rejected, (state, action) => {
        removeCaTokenCookie();
        state.status = 'failed';
        state.user = undefined;
      });
  },
});

export const { logout } = loginSlice.actions;

export const selectUser = (state: RootState) => state.login.user;

export const selectStatus = (state: RootState) => state.login.status;

export default loginSlice.reducer;
