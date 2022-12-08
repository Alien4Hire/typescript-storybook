import { Card, styled } from '@mui/material';
import Box from '@mui/material/Box';

export const StyledCard = styled(Card)(({ theme }) => ({
  border: `1px solid ${theme.palette.gray.medium}`,
  boxShadow: 'none',
}));

export const TitleWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const InfoWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});
