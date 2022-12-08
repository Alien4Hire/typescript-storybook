import { Input } from '@mui/material';
import { styled } from '@mui/material/styles';

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
      color: theme.palette.gray.dark,
      opacity: 1,
      fontStyle: 'italic',
    },
  },
}));
