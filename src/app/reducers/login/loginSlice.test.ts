import UniversalCookie from 'universal-cookie';
import { store } from '../../store';
import loginReducer, {
  LoginStateI,
  googleAuthAsync,
  logout,
} from './loginSlice';
import { verifyGoogleUser } from './loginApi';

jest.mock('./loginApi');

describe('Login reducer', () => {
  const initialState: LoginStateI = {
    status: 'idle',
    user: undefined,
  };

  const mockUser = {
    id: 'b0e6b2ef-18b3-422a-b268-d38ebef03580',
    mlIamId: 'mock-ml-iam-id',
    googleId: 'mock-google-id',
    firstName: 'mock-first-name',
    lastName: 'mock-last-name',
    token: 'mock-token',
    profilePhoto: 'mock-profile-photo',
  };

  it('should handle initial state', () => {
    expect(loginReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('When calling googleAuthAsync', () => {
    describe('When googleAuthAsync is successfully called', () => {
      it('Should update the googleClientKey', async () => {
        const mockVerifyGoogleUser = verifyGoogleUser as jest.MockedFunction<
          typeof verifyGoogleUser
        >;
        mockVerifyGoogleUser.mockResolvedValue({
          user: mockUser,
          token: mockUser.token,
        });

        const result = await store.dispatch(googleAuthAsync(mockUser.token));
        const loginPayload = result.payload as any;
        const loginState = store.getState().login;

        expect(result.type).toBe('login/googleAuth/fulfilled');
        expect(loginPayload.token).toEqual(mockUser.token);
        expect(loginPayload.user).toEqual(mockUser);
        expect(loginState).toEqual({
          status: 'idle',
          user: mockUser,
        });
      });
    });

    describe('When googleAuthAsync call fails', () => {
      it('Should not update the user and return status of `failed`', async () => {
        const mockVerifyGoogleUser = verifyGoogleUser as jest.MockedFunction<
          typeof verifyGoogleUser
        >;
        mockVerifyGoogleUser.mockRejectedValue(new Error('failed'));

        const result = await store.dispatch(googleAuthAsync(mockUser.token));
        const loginPayload = result.payload;
        const loginState = store.getState().login;

        expect(result.type).toBe('login/googleAuth/rejected');
        expect(loginPayload).toBeUndefined();
        expect(loginState).toEqual({
          status: 'failed',
          user: undefined,
        });
      });
    });
  });

  describe('When `logout` is called', () => {
    it('Should unset the cookie and remove user from state', () => {
      (global as any).google = {
        accounts: {
          id: {
            disableAutoSelect: jest.fn(),
          } as unknown as jest.Mock<typeof google.accounts.id>,
        },
      };
      jest.spyOn(UniversalCookie.prototype, 'remove');
      const result = store.dispatch(logout());
      expect(UniversalCookie.prototype.remove).toHaveBeenCalledTimes(1);
      expect(result.type).toBe('login/logout');
      const loginState = store.getState().login;
      expect(loginState).toEqual({
        status: 'idle',
        user: undefined,
      });
    });
  });
});
