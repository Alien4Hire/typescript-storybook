import { Select, selectClasses, styled } from '@mui/material';

export const StyledSelect = styled(Select)(({ theme }) => ({
  '&': {
    border: `1px solid ${theme.palette.gray.main}`,
    borderRadius: 0,
    outline: 'none',
  },
  [`& .${selectClasses.icon}`]: {
    fill: theme.palette.aqua.main,
  },

  [`& .${selectClasses.select}`]: {
    padding: '4px 37px 4px 6px',
    minWidth: 160,
    boxSizing: 'border-box',
    color: theme.palette.black.main,
  },
  fieldset: {
    border: 'none',
  },
}));
