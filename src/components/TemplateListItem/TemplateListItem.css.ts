import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { TableRow, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { ReactComponent as ItemCopy } from '../../icons/item_copy.svg';
import { ReactComponent as ItemEdit } from '../../icons/item_edit_duplicate.svg';
import MoreVert from '@mui/icons-material/MoreVert';
import ForwardIcon from '@mui/icons-material/Forward';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: '13px',
    fontWeight: 'bold',
    padding: '4px',
    color: theme.palette.gray.dark,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '13px',
    fontWeight: 'normal',
    padding: '4px',
    color: theme.palette.gray.dark,
  },
}));

export const StyledTableRow = styled(TableRow)(() => ({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  marginTop: 5,
  color: theme.palette?.gray?.dark,
  fontSize: 14,
}));

export const StyledVersionTitleLink = styled(Link)(({ theme }) => ({
  color: theme.palette?.primary?.main,
  textDecoration: 'none',
}));

export const StyledSettingsIcon = styled(SettingsIcon)(({ theme }) => ({
  fill: `${theme.palette.aqua.main}`,
  color: `${theme.palette.aqua.main}`,
  backgroundColor: 'transparent',
  width: '24px',
  height: '24px',
}));

export const StyledItemCopy = styled(ItemCopy)(({ theme }) => ({
  fill: `${theme.palette.aqua.main}`,
  width: '24px',
  height: '24px',
  cursor: 'pointer',
}));

export const StyledItemEdit = styled(ItemEdit)(({ theme }) => ({
  fill: `${theme.palette.aqua.main}`,
  width: '24px',
  height: '24px',
  cursor: 'pointer',
}));

export const styles = {
  container: {
    p: '16px',
    position: 'relative',
    marginBottom: '5px',
  },
  itemCopyButton: {
    position: 'absolute',
    bottom: '4px',
    right: '16px',
  },
  settingsButton: {
    position: 'absolute',
    top: '16px',
    right: '16px',
  },
};

export const StyledMoreVert = styled(MoreVert)(({ theme }) => ({
  fill: `${theme.palette.aqua.main}`,
  color: `${theme.palette.aqua.main}`,
  backgroundColor: 'transparent',
  width: '24px',
  height: '24px',
}));

export const StyledForwardIcon = styled(ForwardIcon)(({ theme }) => ({
  fill: `${theme.palette.aqua.main}`,
  color: `${theme.palette.aqua.main}`,
  backgroundColor: 'transparent',
  width: '24px',
  height: '24px',
}));

export const StyledOpenInNewIcon = styled(OpenInNewIcon)(({ theme }) => ({
  fill: `${theme.palette.aqua.main}`,
  color: `${theme.palette.aqua.main}`,
  backgroundColor: 'transparent',
  width: '24px',
  height: '24px',
}));

export const StyledAuthorModel = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  color: theme.palette?.gray?.dark,
}));

export const StyledReleaseLink = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(1),
  textAlign: 'end',
  color: `${theme.palette.aqua.main}`,
  fontWeight: '600',
  textDecoration: 'underline',
  cursor: 'pointer',
}));
