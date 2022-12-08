import { Box, Button } from '@mui/material';

import { styled } from '@mui/material/styles';

export const Divider = styled('div')(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.gray.medium}`,
  height: '34px',
  margin: 'auto',
}));

export const Label = styled('div')(({ theme }) => ({
  fontWeight: '600',
  fontSize: '15px',
  letterSpacing: '0.4px',
  color: theme.palette.gray.veryDark,
  fontFamily: "'Source Sans Pro', sans-serif",
}));

export const Wrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  background: theme.palette.gray.veryLight,
  paddingLeft: '56px',
}));

export const FolderForm = styled('div')`
  display: flex;
  align-items: center;
`;

export const FolderAdd = styled(Box, {
  shouldForwardProp: (prop: string) => prop !== 'active',
})(({ active, theme }) => ({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: 'auto',
  padding: '2px',
  backgroundColor: theme.palette?.gray.veryLight,
  display: 'none',
  ...(active && {
    display: 'flex',
    alignItems: 'center',
  }),
}));

export const CsvModalBackdrop = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f1f1f1',
  borderRadius: '16px',
  padding: '32px 32px 70px',
});

export const UploadListItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '16px 0px',
  borderBottom: `1px solid ${theme.palette.gray.light}`,
}));

export const UploadButton = styled(Button)({
  textTransform: 'none',
  width: 'fit-content',
  marginTop: '16px',
});

export const DownloadTemplateWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginTop: '24px',
  cursor: 'pointer',
});
