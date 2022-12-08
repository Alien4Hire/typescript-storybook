import AppReducer, {
  AppStateI,
  setHeader,
  setToastNotification,
  setSidebarStatus,
} from './appSlice';

describe('TopMenu reducer', () => {
  const initialState: AppStateI = {
    isTemplateHeader: false,
    isSidebarOpen: true,
    toastNotification: {
      open: false,
      message: '',
      type: 'error',
    },
  };
  it('should handle initial state', () => {
    expect(AppReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
  it('should change selected header', () => {
    const actual = AppReducer(initialState, setHeader(true));
    expect(actual.isTemplateHeader).toBe(true);
  });
  it('should change sidebar status to false', () => {
    const actual = AppReducer(initialState, setSidebarStatus(false));
    expect(actual.isSidebarOpen).toBe(false);
  });
  it('should change sidebar status to true', () => {
    const actual = AppReducer(initialState, setSidebarStatus(true));
    expect(actual.isSidebarOpen).toBe(true);
  });
  it('should set a success toast notification', () => {
    const actual = AppReducer(
      initialState,
      setToastNotification({
        open: true,
        message: 'Success toast notification',
        type: 'success',
      })
    );
    expect(actual.toastNotification).toEqual({
      open: true,
      message: 'Success toast notification',
      type: 'success',
    });
  });
});
