/**
 * useLogout
 * Custom hook for logging out a user and resetting the RTKquery state
 */
import { apiBase } from '../app/api';
import { useAppDispatch } from '../app/hooks';
import { logout } from '../app/reducers/login/loginSlice';

const useLogout = () => {
  const dispatch = useAppDispatch();

  const logoutUser = () => {
    dispatch(apiBase.util.resetApiState());
    dispatch(logout());
  };

  return logoutUser;
};

export default useLogout;
