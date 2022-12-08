import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { ReactComponent as Cog } from '../../icons/cog.svg';
import { ReactComponent as TrashHollow } from '../../icons/trash_hollow.svg';

export const StyledTreeItem = styled(TreeItem)(({ theme }) => ({
  [`& .${treeItemClasses.content}`]: {
    boxSizing: 'border-box',
    borderBottom: `1px solid ${theme.palette.gray.light}`,
    padding: '20px 0',
  },

  [`& .${treeItemClasses.group}`]: {
    margin: 0,
  },
  [`& .${treeItemClasses.group} .${treeItemClasses.root} > div:nth-child(1)`]: {
    paddingLeft: 'calc(30px + 8px)',
  },
  [`& .${treeItemClasses.group} .${treeItemClasses.group} .${treeItemClasses.root} > div`]:
    {
      paddingLeft: 'calc(30px * 2 + 8px)',
    },

  [`& .${treeItemClasses.label} .MuiFormControlLabel-labelPlacementEnd`]: {
    marginRight: 0,
  },
  'svg.first-of-type': {
    visibility: 'hidden',
  },
}));

export const Div = styled('div')(({ theme }) => ({
  position: 'relative',
  marginTop: '210px',
  border: `1px solid ${theme.palette.gray.light}`,
  '@media (min-width: 1362px)': {
    marginTop: '180px',
  },
}));

export const ExpandWrapper = styled('div')`
  margin: 5px 0 0 0;
`;

export const ResourcesAndMoreMenuWrapper = styled('div')`
  display: flex;
  align-items: center;
`;

export const TreeItemsWrapper = styled('div')`
  display: flex;
  align-items: center;
`;

export const TreeRecourses = styled('div')(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '14px',
  lineHeight: '20px',
  color: theme.palette.aqua.main,
  margin: '0 57px 0 auto',
}));

export const Span = styled('div')`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

export const TreeWrapper = styled('div')`
  display: flex;
  padding: 0 60px;
  justify-content: space-between;
  ul {
    flex-grow: 1;
  }
`;

export const TreeWrapperNoContent = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 60px;
`;

export const FolderLabel = styled('div')`
  margin-left: 15px;
  font-weight: 600;
  font-size: 18px;
`;

export const FolderItemLabel = styled('div')(({ theme }) => ({
  marginLeft: '15px',
  fontSize: '16px',
  color: theme.palette.aqua.main,
}));

export const StickyPanelWrapper = styled('div')`
  top: 190px;
  position: sticky;
  align-self: flex-start;
`;

export const StyledCog = styled(Cog)(({ theme }) => ({
  fill: `${theme.palette.primary.main}`,
  color: `${theme.palette.primary.main}`,
  backgroundColor: 'transparent',
  width: '24px',
  height: '24px',
}));

export const StyledTrashHollow = styled(TrashHollow)(({ theme }) => ({
  fill: `${theme.palette.aqua.main}`,
  color: `${theme.palette.aqua.main}`,
  backgroundColor: 'transparent',
  width: '24px',
  height: '24px',
}));

export const ActivitySettingInfoWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  marginRight: '10px',
});
