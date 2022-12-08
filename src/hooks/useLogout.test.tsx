import { renderHook, act } from '@testing-library/react-hooks';
import * as Api from '../app/api';
import * as LoginSlice from '../app/reducers/login/loginSlice';
import useLogout from './useLogout';

jest.mock('../app/hooks', () => {
  return {
    useAppDispatch: () => jest.fn(),
  };
});

describe('useLogout hook', () => {
  test('Should call loginSlice logout() and RTKquery resetApiState', () => {
    jest.spyOn(Api.apiBase.util, 'resetApiState');
    jest.spyOn(LoginSlice, 'logout');

    const { result } = renderHook(() => useLogout());
    act(() => {
      result.current();
    });

    expect(LoginSlice.logout).toHaveBeenCalledTimes(1);
    expect(Api.apiBase.util.resetApiState).toHaveBeenCalledTimes(1);
  });
});
