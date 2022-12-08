import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuItem, AppBar, Typography } from '@mui/material';
import { theme } from '../../theme';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectUser, CaUserT } from '../../app/reducers/login/loginSlice';
import { selectGoogleClientKey } from '../../app/reducers/config/configSlice';
import {
  selectCurrentHeader,
  setHeader,
} from '../../app/reducers/appSlice/appSlice';
import { selectCurrentTemplate } from '../../app/reducers/templates/templateSlice';
import {
  getSideBarStatus,
  setSidebarStatus,
} from '../../app/reducers/appSlice/appSlice';
import {
  Controls,
  ProfileSelect,
  StackedLayout,
  StyledButton,
  StyledMenuIcon,
  StyledMacmillanFlag,
  StyledToolbar,
} from './TopMenu.styles';
import useLogout from '../../hooks/useLogout';
import { format } from 'date-fns';

const UserMenuLoggedIn = ({ user }: { user: CaUserT }) => {
  const logoutUser = useLogout();
  const googleClientId = useAppSelector(selectGoogleClientKey);
  const isTemplateHeader = useAppSelector(selectCurrentHeader);
  const loadingLogout = !googleClientId;

  return (
    <ProfileSelect value={1} $isTemplateHeader={isTemplateHeader}>
      <MenuItem value={1}>
        {user.firstName} {user.lastName}
      </MenuItem>
      <MenuItem value={2}>
        {loadingLogout && <p>Loading...</p>}
        {!loadingLogout && <div onClick={() => logoutUser()}>Logout</div>}
      </MenuItem>
    </ProfileSelect>
  );
};

const UserMenuLoggedOut = () => {
  return (
    <ProfileSelect value={1}>
      <MenuItem value={1}>
        <Link to="/login">Login</Link>
      </MenuItem>
    </ProfileSelect>
  );
};

const TopMenu = () => {
  const user = useAppSelector(selectUser);
  const template = useAppSelector(selectCurrentTemplate);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const isTemplateHeader = useAppSelector(selectCurrentHeader);
  const sideBarStatus = useAppSelector(getSideBarStatus);
  const subHeader = useMemo(() => {
    if (!template) return '';
    const version = `Version ${template.templateVersionLabel}`;
    const updatedDate =
      template.templateVersionUpdatedAt &&
      format(new Date(template.templateVersionUpdatedAt), 'iii, MMM dd, p');
    return `${version} - ${updatedDate}`;
  }, [template]);

  const onClickMenuIconButton = () => {
    dispatch(setSidebarStatus(!sideBarStatus));
  };

  React.useEffect(() => {
    dispatch(
      setHeader(
        pathname.includes('/search') || pathname.includes('/activities')
      )
    );
  }, [pathname, dispatch]);

  return (
    <AppBar
      sx={{
        backgroundColor: isTemplateHeader
          ? theme.palette.white.main
          : theme.palette.aqua.veryDark,
      }}
    >
      <StyledToolbar>
        {isTemplateHeader ? (
          <StyledButton
            onClick={onClickMenuIconButton}
            variant="text"
            label={''}
          >
            <StyledMenuIcon />{' '}
          </StyledButton>
        ) : (
          <Link style={{ padding: '5px 10px 5px 0px' }} to="/">
            <StyledMacmillanFlag />
          </Link>
        )}
        <StackedLayout>
          <Typography variant="h3">
            {isTemplateHeader && template?.templateName}
          </Typography>
          <Typography variant="h4" color={theme.palette.gray.dark}>
            {isTemplateHeader && subHeader}
          </Typography>
        </StackedLayout>
        <Controls>
          {user && <UserMenuLoggedIn user={user} />}
          {!user && <UserMenuLoggedOut />}
        </Controls>
      </StyledToolbar>
    </AppBar>
  );
};

export default TopMenu;
