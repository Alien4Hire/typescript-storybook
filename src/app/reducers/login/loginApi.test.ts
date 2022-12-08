import { verifyGoogleUser } from './loginApi';
import fetchMock from 'jest-fetch-mock';

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('loginApi', () => {
  describe('verifyGoogleUser()', () => {
    const mockRequestToken = 'mock-request-token';
    const mockVerifiedUserResponse = {
      id: 'mock-user-id',
      firstName: 'mock-first-name',
      lastName: 'mock-last-name',
      email: 'mock-email',
      profilePhoto: 'mock-profile-photo',
    };

    describe('When request is successful', () => {
      it('Should return user and token information when successful', async () => {
        fetchMock.mockResponse(JSON.stringify(mockVerifiedUserResponse), {
          status: 200,
        });
        const response = await verifyGoogleUser(mockRequestToken);
        expect(response).toStrictEqual({
          token: mockRequestToken,
          user: mockVerifiedUserResponse,
        });
      });
    });

    describe('When request is a non-200 response', () => {
      it('Should throw an error', async () => {
        expect.assertions(1);
        fetchMock.mockResponse(JSON.stringify({}), { status: 401 });
        try {
          await verifyGoogleUser(mockRequestToken);
        } catch (e: any) {
          expect(e.message).toBe('something went wrong');
        }
      });
    });
  });
});
