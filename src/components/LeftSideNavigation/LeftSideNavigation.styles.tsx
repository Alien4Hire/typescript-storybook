import { Accordion, Box, Button, Input } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Container = styled(Box)(({ theme }) => ({
  width: '399px',
  backgroundColor: theme.palette.white.main,
  height: '100%',
  // boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
  borderRight: '1px solid rgb(0 0 0 / 20%)',
  overflow: 'auto',
}));

export const SearchBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '10px 20px',
}));

export const Section = styled(Box)(({ theme }) => ({
  padding: '18px 20px',
  borderBottom: `1px solid ${theme.palette.gray.light}`,
}));

export const StyledAccordion = styled(Accordion)(({ theme }) => ({
  margin: '0 !important',
  borderRadius: '0',
  border: `1px solid ${theme.palette.gray.light}`,
}));

export const StyledInput = styled(Input)(({ theme }) => ({
  '&': {
    border: `1px solid ${theme.palette.gray.dark}`,
    padding: '7px 10px 7px 7px',
    width: '100%',
  },
  input: {
    padding: '0',
    '&::placeholder': {
      lineHeight: '20px',
      color: `${theme.palette.gray.dark}`,
      opacity: 1,
      fontStyle: 'italic',
    },
  },
}));

export const StyledButton = styled(Button)(() => ({
  textTransform: 'none',
  margin: '18px 16px',
  fontWeight: '400',
}));
