import { styled } from '@mui/material/styles';

export const Wrapper = styled('div')(({ theme }) => ({
  padding: '20px',
  backgroundColor: theme.palette.gray.veryLight,
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
}));

export const Header = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  margin: '18px 0',
  a: {
    textDecoration: 'none',
  },
});
