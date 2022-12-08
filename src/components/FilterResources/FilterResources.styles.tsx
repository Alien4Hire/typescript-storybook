import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Container = styled(Box)(() => ({
  position: 'absolute',
  zIndex: 10,
  marginTop: '52px',
  display: 'flex',
  width: 'calc(100% - 72px)',
}));

export const LeftSideNavigationContainer = styled(Box)(() => ({
  height: 'calc(100vh - 120px)',
}));

export const ResultContainer = styled(Box)(() => ({
  width: 'calc(100% - 400px)',
}));

export const ResultListContainer = styled(Box)(({ theme }) => ({
  padding: '0 40px',
  backgroundColor: theme.palette.gray.veryLight,
}));

export const Section = styled(Box)(({ theme }) => ({
  height: '68px',
  borderBottom: `1px solid ${theme.palette.gray.light}`,
}));
