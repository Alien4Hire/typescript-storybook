import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Container = styled(Box)(() => ({
  width: '100%',
}));

export const SelectAllContainer = styled(Box)(() => ({
  width: '100%',
  padding: '12px 20px',
}));

export const ItemsContainer = styled(Box)(({ theme, ...props }) => ({
  alignItems: 'center',
  backgroundColor: props.checked
    ? theme.palette.blue.veryLight
    : theme.palette.white.main,
}));

export const StyledTitle = styled(Typography)({
  fontStyle: 'italic',
  fontSize: 15,
  lineHeight: '24px',
  marginBottom: '5px',
});
