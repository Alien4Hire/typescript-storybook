import { Box, styled, List, ListItem } from '@mui/material';

import CheckIcon from '@mui/icons-material/Check';

export const TargetDestinationWrapper = styled(Box)(({ theme }) => ({
  margin: '180px 12px 12px 12px',
  textTransform: 'none',
  height: '100%',
  marginBottom: '12px',
}));

export const FolderSidePanel = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100%',
  width: '400px',
  border: `1px solid ${theme.palette.gray.medium}`,
}));

export const FolderSidePanelHeader = styled(Box)(({ theme }) => ({
  padding: '20px 20px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: `1px solid ${theme.palette.gray.medium}`,
}));

export const FolderSidePanelList = styled(List)(() => ({
  overflow: 'auto',
  height: '100%',
  paddingBottom: '5px',
}));

export const CustomCheckIcon = styled(CheckIcon)(({ theme }) => ({
  fill: theme.palette.teal.dark,
}));

export const FolderSidePanelListItem = styled(ListItem)<{ selected?: boolean }>(
  ({ theme, selected }) => ({
    backgroundColor: selected
      ? `${theme.palette.teal.light}`
      : `${theme.palette.background.paper}`,
    borderBottom: `1px solid ${theme.palette.gray.medium}`,
    padding: '8px',
  })
);

export const FolderSidePanelRootItem = styled(ListItem)<{ selected?: boolean }>(
  ({ theme, selected }) => ({
    backgroundColor: selected
      ? `${theme.palette.teal.light}`
      : `${theme.palette.background.paper}`,
    borderBottom: `1px solid ${theme.palette.gray.medium}`,
    borderTop: `1px solid ${theme.palette.gray.medium}`,
    padding: '8px',
  })
);
