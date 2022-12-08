import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  padding: '20px 40px',
  margin: '20px',
  backgroundColor: theme.palette.gray.veryLight,
  borderRadius: '5px',
}));

export const ImageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  minWidth: '135px',
  minHeight: '135px',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const DescriptionContainer = styled(Box)(() => ({
  marginLeft: '35px',
}));

export const Heading = styled(Typography)`
  font-size: 18px;
  font-weight: 500;
  margin: 20px 0;
`;

export const Description = styled(Typography)`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
`;
