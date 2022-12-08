import {
  Box,
  Typography,
  Button,
  ListItemText,
  ListItemIcon,
  Collapse,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getExpandedFolders,
  setExpandedFolder,
  getSelectedFolder,
  setSelectedFolder,
} from '../../app/reducers/targetFolderSideBar/targetFolderSideBarSlice';

import { FolderT } from '../../util/folderTree';

import {
  FolderSidePanelListItem,
  CustomCheckIcon,
  TargetDestinationWrapper,
  FolderSidePanel,
  FolderSidePanelHeader,
  FolderSidePanelList,
  FolderSidePanelRootItem,
} from './TargetFolderSideBar.style';

type TargetFolderT = {
  folders: FolderT[] | undefined;
};

export type TargetFolderSideBarT = TargetFolderT & {
  isOpen: boolean;
};

const rootItem = {
  id: 'root',
  name: 'Root Level',
  type: 'root' as 'root',
  children: [],
};

const TargetFolderSideBar = ({
  folders,
  isOpen = false,
}: TargetFolderSideBarT) => {
  const selected = useAppSelector(getSelectedFolder);
  const expanded = useAppSelector(getExpandedFolders);
  const dispatch = useAppDispatch();

  const handleChevronClick = (
    _: React.MouseEvent<SVGSVGElement, MouseEvent>,
    item: FolderT
  ) => {
    _.stopPropagation();
    dispatch(setExpandedFolder(item.id));
  };

  const handleItemClick = (
    _: React.MouseEvent<HTMLLIElement, MouseEvent>,
    item: FolderT
  ) => {
    dispatch(setSelectedFolder(item));
  };

  const isSelected = (item: FolderT) => selected?.id === item.id;
  const hasChildren = (item: FolderT): boolean => !!item?.children?.length;
  const isExpanded = (id: string) => expanded[id] === true;
  const nestedMenu = ({ folders }: TargetFolderT) => {
    return folders?.map((item) => {
      return (
        item.type === 'folder' && (
          <Box key={item.id}>
            <FolderSidePanelListItem
              key={item.id}
              selected={isSelected(item)}
              onClick={(event: React.MouseEvent<HTMLLIElement, MouseEvent>) =>
                handleItemClick(event, item)
              }
            >
              <ListItemIcon
                data-testid="folder-expanded-icon-container"
                sx={{ minWidth: '30px' }}
              >
                {hasChildren(item) ? (
                  <ChevronRightIcon
                    onClick={(event) => handleChevronClick(event, item)}
                    data-testid="folder-expanded-icon"
                    sx={{
                      transform: isExpanded(item.id)
                        ? 'rotate(90deg)'
                        : 'rotate(0deg)',
                    }}
                  />
                ) : null}
              </ListItemIcon>
              <ListItemText primary={item.name} />
              <ListItemIcon>
                {selected?.id === item.id ? (
                  <CustomCheckIcon data-testid="item-selected-checkmark" />
                ) : null}
              </ListItemIcon>
            </FolderSidePanelListItem>
            <Collapse component="ul" in={isExpanded(item.id)} timeout="auto">
              {nestedMenu({ folders: item.children })}
            </Collapse>
          </Box>
        )
      );
    });
  };

  return (
    <>
      {isOpen ? (
        <TargetDestinationWrapper>
          <FolderSidePanel>
            <FolderSidePanelHeader>
              <Typography variant="h3">Select a Destination Folder</Typography>
              <Button
                color="primary"
                variant="contained"
                test-id="move-button"
                data-testid="move-button"
                disabled={!selected}
              >
                Move
              </Button>
            </FolderSidePanelHeader>
            <Box>
              <FolderSidePanelList data-testid="folder-list">
                <FolderSidePanelRootItem
                  key="root"
                  selected={isSelected(rootItem)}
                  onClick={(
                    event: React.MouseEvent<HTMLLIElement, MouseEvent>
                  ) => handleItemClick(event, rootItem)}
                >
                  <ListItemIcon sx={{ minWidth: '30px' }} />
                  <ListItemText primary={rootItem.name} />
                  <ListItemIcon>
                    {isSelected(rootItem) ? (
                      <CustomCheckIcon data-testid="item-selected-checkmark" />
                    ) : null}
                  </ListItemIcon>
                </FolderSidePanelRootItem>
                {folders && nestedMenu({ folders })}
              </FolderSidePanelList>
            </Box>
          </FolderSidePanel>
        </TargetDestinationWrapper>
      ) : null}
    </>
  );
};

export default React.memo(TargetFolderSideBar);
