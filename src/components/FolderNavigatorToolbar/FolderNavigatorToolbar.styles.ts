import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Divider = styled('div')`
  border-right: 1px solid #c8c8c8;
  height: 34px;
  margin: auto;
`;

export const Wrapper = styled('div')`
  position: relative;
  background: #f3f3f3;
  padding-left: 56px;
`;

export const FolderForm = styled('div')`
  display: flex;
  align-items: center;
`;

export const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.specials?.main,
}));

export const FolderAdd = styled(Box, {
  shouldForwardProp: (prop: any) => prop !== 'active',
})(({ active, theme }) => ({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: 'auto',
  padding: '2px',
  backgroundColor: theme.palette?.gray?.veryLight,
  display: 'none',
  ...(active && {
    display: 'block',
  }),
}));
