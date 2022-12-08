import {
  Drawer,
  Select,
  selectClasses,
  Toolbar,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material';

import Button from '@mui/material/Button';
import { ReactComponent as MacmillanFlag } from '../../icons/macmillan_flag.svg';
import { ReactComponent as MenuIcon } from '../../icons/menu.svg';

export const StyledToolbar = styled(Toolbar)`
  padding: 0px;
`;

export const StyledMenuIcon = styled(MenuIcon)(({ theme }) => ({
  fill: theme.palette.gray.dark,
}));

export const StyledMacmillanFlag = styled(MacmillanFlag)(({ theme }) => ({
  marginTop: '5px',
  height: '45px',
  width: '45px',
}));

export const StyledButton = styled(Button)`
  width: 24px;
  min-width: 48px;
  margin: 0 12px;
  height: 48px;
  padding: 0 12px;
  border-radius: 0;
`;

export const StyledTitle = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  lineHeight: '160%',
  letterSpacing: '0.15px',
  color: theme.palette?.specials?.black,
  fontFamily: '"Source Sans Pro", sans-serif',
}));

export const StyledControlLabel = styled(Typography)`
  font-size: 16px,
  font-family: '"Source Sans Pro", sans-serif !important',
`;

export const StyledDrawer = styled(Drawer)(({ theme, $isTemplateHeader }) => ({
  '& .MuiDrawer-paper': {
    width: '100%',
    paddingRight: '40px',
    height: '64px',
    border: 0,
    display: 'flex',
    alignItems: 'center !important',
    flexDirection: 'row',
    boxSizing: 'border-box',
    boxShadow:
      '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12)',
    backgroundColor: $isTemplateHeader
      ? theme.palette.white
      : theme.palette.aqua.veryDark,
    color: !$isTemplateHeader ? theme.palette.white : theme.palette.black,
  },
}));

export const Controls = styled('div')`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

export const StackedLayout = styled('div')`
  display: flex;
  flex-direction: column;
`;

export const ProfileSelect = styled(Select)(({ theme, $isTemplateHeader }) => ({
  '&': {
    width: '90px !important',
    height: '60px !important',
    margin: '0 24px',
    color: $isTemplateHeader
      ? theme.palette.aqua.main
      : theme.palette.white.main,
    marginLeft: '24px',
    position: 'relative',
  },
  [`& .${selectClasses.select}`]: {
    padding: '0 13px 0 0 !important ',
  },
  '& fieldset': {
    border: 'none',
  },
  [`& .${selectClasses.icon}`]: {
    fill: $isTemplateHeader
      ? theme.palette.aqua.main
      : theme.palette.white.main,
    right: 0,
    width: '20px',
    height: '20px',
  },
}));
