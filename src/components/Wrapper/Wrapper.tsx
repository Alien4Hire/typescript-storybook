import React from 'react';
import { styled } from '@mui/material/styles';
import Sidebar from '../Sidebar/Sidebar';
import TopMenu from '../TopMenu/TopMenu';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getSideBarStatus,
  setSidebarStatus,
  getToastNotification,
  resetToastNotification,
} from '../../app/reducers/appSlice/appSlice';

import { ToastNotification } from '../ToastNotification/ToastNotification';

const SidebarDiv = styled('div')`
  margin: 64px 0 0 72px;
`;

const FullDiv = styled('div')`
  margin 64px 0 0 0;
`;

export type MlWrapperT = {
  sidebarVisible?: boolean;
  isProtected?: boolean;
  children?: React.ReactNode;
};

const Wrapper = ({
  sidebarVisible = false,
  children,
}: React.PropsWithChildren<MlWrapperT>) => {
  const dispatch = useAppDispatch();
  const sideBarStatus = useAppSelector(getSideBarStatus);

  React.useEffect(() => {
    dispatch(setSidebarStatus(sidebarVisible));
  }, [dispatch, sidebarVisible]);

  const { open, message, type } = useAppSelector(getToastNotification);

  if (sideBarStatus) {
    return (
      <>
        <TopMenu />
        <Sidebar />
        <SidebarDiv>{children}</SidebarDiv>
        {open && (
          <ToastNotification
            testId="global-toast-notification"
            open={open}
            type={type}
            message={message}
            onClose={() => dispatch(resetToastNotification())}
          />
        )}
      </>
    );
  }

  return (
    <>
      <TopMenu />
      {sideBarStatus && <Sidebar />}
      <FullDiv>{children}</FullDiv>
      {open && (
        <ToastNotification
          testId="global-toast-notification"
          open={open}
          type={type}
          message={message}
          onClose={() => dispatch(resetToastNotification())}
        />
      )}
    </>
  );
};

export default Wrapper;
