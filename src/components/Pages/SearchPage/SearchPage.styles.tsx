import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Container = styled(Box)(() => ({
  display: 'flex',
}));

export const LeftSideNavigationContainer = styled(Box)(() => ({
  minHeight: 'calc(100vh - 64px)',
  height: 'auto',
}));

export const ResultContainer = styled(Box)(() => ({
  width: 'calc(100% - 400px)',
}));

export const ResultListContainer = styled(Box)(({ theme }) => ({
  padding: '0 40px',
  backgroundColor: theme.palette.gray.veryLight,
  minHeight: 'calc(100% - 70px)',
}));

export const Section = styled(Box)(({ theme }) => ({
  height: '68px',
  borderBottom: `1px solid ${theme.palette.gray.light}`,
}));

export const ButtonContainer = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'end',
  padding: '0 40px',
  backgroundColor: theme.palette.gray.veryLight,
}));

export const Menu = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: `${theme.palette.aqua.dark}`,
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'end',
  alignItems: 'center',
  textAlign: 'center',
  padding: '0 40px',
  button: {
    borderRadius: '0px !important',
  },
  'button:last-of-type': {
    borderLeft: `1px solid ${theme.palette.gray.veryLight}`,
    paddingLeft: '20px',
    marginLeft: '20px',
  },
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  color: `${theme.palette.background.paper}`,
  fontSize: '16px',
  fontWeight: '400',
  lineHeight: '24px',
}));
