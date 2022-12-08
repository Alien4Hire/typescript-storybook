import { Box, Checkbox, Typography } from '@mui/material';
import { ResultItemT } from '../../app/reducers/search/searchSlice';
import { useState } from 'react';
import { MlDropdownMenuOptionPropsT } from '../DropdownMenu/DropdownMenu';
import FolderDropdown from '../FolderDropdown/FolderDropdown';
import {
  Container,
  LinkText,
  ResourceAction,
  StyledAddIcon,
  StyledAssignmentIcon,
  StyledCheckCircleIcon,
} from './ResultItem.styles';

export type ResultItemPropsT = ResultItemT & {
  onCheck: (id: string) => void;
  onAddResource?: (id: string, folder: MlDropdownMenuOptionPropsT) => void;
};

const ResultItem = ({
  checkedValue,
  checked,
  onCheck,
  activityName,
  contentId,
  modifiedDate,
  onAddResource,
  addedToLibrary,
}: ResultItemPropsT) => {
  const subtitle = `ID: ${contentId} Last Modified: ${new Date(
    modifiedDate
  ).toLocaleString()}`;

  const handleActionClick = (folder: MlDropdownMenuOptionPropsT) => {
    !addedToLibrary && onAddResource?.(contentId, folder);
  };

  const onHandleCheck = () => {
    onCheck(contentId);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container checked={checked}>
      <Checkbox
        value={checkedValue}
        checked={checked}
        onChange={onHandleCheck}
      />
      <Box display="flex" alignItems="center">
        <StyledAssignmentIcon />
        <Box ml="10px">
          <Typography
            sx={(theme) => ({
              color: theme.palette.aqua.main,
              mb: '7px',
            })}
          >
            {activityName}
          </Typography>
          <Typography
            sx={(theme) => ({
              color: theme.palette.gray.veryDark,
            })}
          >
            {subtitle}
          </Typography>
        </Box>
      </Box>
      <ResourceAction onClick={handleClick} role="button">
        {addedToLibrary ? (
          <>
            <StyledCheckCircleIcon />
            <LinkText>In Library</LinkText>
          </>
        ) : (
          <>
            <StyledAddIcon />
            <Typography
              variant="textSub"
              sx={(theme) => ({
                color: theme.palette.gray.veryDark,
                mt: '3px',
                lineHeight: '15px',
              })}
            >
              Add Resource
            </Typography>
          </>
        )}
      </ResourceAction>
      <FolderDropdown
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onItemClick={handleActionClick}
        onClose={handleClose}
      />
    </Container>
  );
};

export default ResultItem;
