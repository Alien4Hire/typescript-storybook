import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddIcon from '@mui/icons-material/Add';

export const Container = styled(Box)(({ theme, ...props }) => ({
  display: 'grid',
  gridTemplateRows: '1fr',
  gridTemplateColumns: '45px 1fr 78px',
  alignItems: 'center',
  padding: '12px 20px',
  backgroundColor: props.checked
    ? theme.palette.aqua.veryLight
    : theme.palette.white.main,
  boxShadow: `0px -1px 0px ${theme.palette.gray.light}`,
  borderBottom: `1px solid ${theme.palette.gray.light}`,
}));

export const ResourceAction = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
  alignSelf: 'center',
}));

export const LinkText = styled(Typography)(({ theme }) => ({
  textDecoration: 'underline',
  marginTop: '5px',
  color: theme.palette.aqua.main,
  fontSize: 12,
  lineHeight: '15px',
}));

export const StyledAssignmentIcon = styled(AssignmentIcon)(({ theme }) => ({
  fill: theme.palette.green.medium,
}));

export const StyledCheckCircleIcon = styled(CheckCircleIcon)(({ theme }) => ({
  fill: theme.palette.green.medium,
}));

export const StyledAddIcon = styled(AddIcon)(({ theme }) => ({
  fill: theme.palette.aqua.main,
}));
