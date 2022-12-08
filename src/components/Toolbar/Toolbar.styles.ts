import {
  Tabs,
  tabsClasses,
  AppBar,
  Toolbar as Tool,
  Typography,
} from '@mui/material';
import { styled, css } from '@mui/material/styles';
import Button from '@mui/material/Button';

import { ReactComponent as Slider } from '../../icons/slider.svg';
import { ReactComponent as Arrows } from '../../icons/arrows.svg';
import { ReactComponent as Search } from '../../icons/search.svg';
import { ReactComponent as Cog } from '../../icons/cog.svg';
import { ReactComponent as Refresh } from '../../icons/refresh.svg';

export const Menu = styled('div')(({ theme }) => ({
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  textAlign: 'center',
  button: {
    borderRadius: '0px !important',
  },
  'button:last-of-type': {
    borderLeft: `1px solid ${theme.palette.gray.veryLight}`,
    // paddingLeft: '30px',
    // marginLeft: '30px',
  },
}));

export const StyledTabs = styled(Tabs)(({ theme }) => ({
  '&': {
    borderTop: `1px solid ${theme.palette.gray.main}`,
    borderBottom: `1px solid ${theme.palette.gray.main}`,
  },
  '& button': {
    color: theme.palette?.gray?.dark,
    padding: '16px',
  },
  [`& .${tabsClasses.indicator}`]: {
    background: theme.palette?.specials?.macmillanRed,
    height: '3px',
  },
  '& .Mui-selected': {
    color: theme.palette?.specials?.black,
  },
}));

export const StyledAppBar = styled(AppBar)(({ theme, color }) => ({
  backgroundColor: `${theme.palette.white.main} !important`,
  color: `${theme.palette.black.main}`,
  top: '64px !important',
  width: 'calc(100% - 72px)',
  justifyContent: 'center',
  boxShadow: 'none !important',
}));

export const StyledTool = styled(Tool)`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 10px 50px;
`;

export const StyledSelectedLabel = styled(Typography)`
  width: 95px;
  line-height: 1;
`;

export const StyledButton = styled(Button)(({ theme }) => ({
  color: `${theme.palette.black.main} !important`,
  borderColor: `${theme.palette.black.main} !important`,
}));

const sharedStyle = css`
  width: 24px;
  height: 24px;
  color: #222;
  fill: #222;
  font-weight: 200;
  background-color: transparent;
`;

export const StyledSlider = styled(Slider)`
  ${sharedStyle}
`;
export const StyledArrows = styled(Arrows)`
  ${sharedStyle}
`;
export const StyledSearch = styled(Search)`
  ${sharedStyle}
`;
export const StyledCog = styled(Cog)`
  ${sharedStyle}
`;
export const StyledRefresh = styled(Refresh)`
  ${sharedStyle}
`;
