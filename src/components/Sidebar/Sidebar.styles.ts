import { Drawer } from '@mui/material';
import { css, styled } from '@mui/material/styles';

import IconButton from '@mui/material/IconButton';

import { ReactComponent as Home } from '../../icons/home.svg';
import { ReactComponent as Search } from '../../icons/search.svg';
import { ReactComponent as ListIcon } from '../../icons/list_left.svg';
import { ReactComponent as Cog } from '../../icons/cog.svg';
import File from '@mui/icons-material/InsertDriveFileOutlined';

export const Line = styled('div')(({ theme }) => ({
  border: `1px solid ${theme.palette.gray.dark}`,
  marginTop: '10px',
  marginBottom: '10px',
  position: 'relative',
}));

export const StyledButton = styled(IconButton)(({ theme, ...props }) => ({
  background: props.active && theme.palette.primary.main + ' !important',
  margin: '0px !important',
  height: '48px !important',
  width: '100%',
  borderRadius: '0px !important',
  boxSizing: 'border-box !important',
  '& svg': {
    fill: props.active && theme.palette.white.main,
    color: props.active && theme.palette.white.main,
  },
}));

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: '72px',
    marginTop: '64px',
    height: 'calc(100% - 64px)',
    background: theme.palette.gray.veryDark,
    border: 0,
  },
}));

const sharedStyle = css`
  width: 24px;
  height: 24px;
  color: #ccc;
  fill: #ccc;
  background-color: transparent;
`;

export const StyledHome = styled(Home)`
  ${sharedStyle}
`;

export const StyledSearch = styled(Search)`
  ${sharedStyle}
`;

export const StyledListIcon = styled(ListIcon)`
  ${sharedStyle}
`;

export const StyledCog = styled(Cog)`
  ${sharedStyle}
`;

export const StyledFile = styled(File)`
  ${sharedStyle}
`;
