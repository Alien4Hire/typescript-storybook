import React, { useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SwitchBaseProps } from '@mui/material/internal/SwitchBase';
import TreeView from '@mui/lab/TreeView';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVert from '@mui/icons-material/MoreVert';
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
  Grid,
} from '@mui/material';

import { setToastNotification } from '../../app/reducers/appSlice/appSlice';
import { selectIntegrationHubUrl } from '../../app/reducers/config/configSlice';
import {
  addFolderItem as actionAddFolderItem,
  expandFolderItem as actionExpandFolderItem,
  getLessons,
  moveFolderItem as actionMoveFolderItem,
  removeFolderItem as actionRemoveFolderItem,
  selectFolderItem as actionSelectFolderItem,
  setLessons,
} from '../../app/reducers/lessons/lessonsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getCaTokenCookie } from '../../app/reducers/login/loginSlice';
import { ReactComponent as DocumentCheckIcon } from '../../icons/document_check.svg';
import { ReactComponent as LinkIcon } from '../../icons/link.svg';
import { ReactComponent as MultidraftsIcon } from '../../icons/multidrafts.svg';
import { theme } from '../../theme';
import { FolderMoveDirectionT, FolderT } from '../../util/folderTree';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu';
import FolderNavigatorToolbar from '../FolderNavigatorToolbar/FolderNavigatorToolbar';
import MovePanel from '../MovePanel/MovePanel';

import RecursiveTreeViewActivitySettings from './ReursiveTreeViewActivitySettings';
import {
  Div,
  ExpandWrapper,
  FolderItemLabel,
  FolderLabel,
  ResourcesAndMoreMenuWrapper,
  Span,
  StickyPanelWrapper,
  StyledCog,
  StyledTrashHollow,
  StyledTreeItem,
  TreeItemsWrapper,
  TreeRecourses,
  TreeWrapper,
  TreeWrapperNoContent,
} from './RecursiveTreeView.styles';
import { generateId, launchActivity } from './utils';
import {
  useGetLessonsQuery,
  useAddFolderMutation,
  useReorderItemsMutation,
} from '../../app/reducers/lessons/lessonsAPI';
import { setIsSideBarOpen } from '../../app/reducers/targetFolderSideBar/targetFolderSideBarSlice';
import { getSelectedTemplateViewType } from '../../app/reducers/templateViewTypes/templateViewTypesSlice';
import emptyLessonsImage from '../../images/empty-lessons.png';
import { TemplateNodeT } from '../../../../app/types/templateNodes';

type ActionsT = {
  nodes: FolderT;
};

export const Actions = ({ nodes }: ActionsT) => {
  const options = [
    {
      label: 'Add Activity Settings Rule',
      value: 'ACTIVITY_SETTINGS',
      icon: <StyledCog theme={theme} />,
    },
    {
      label: 'Remove from Resource Structure',
      value: 'DELETE',
      icon: <StyledTrashHollow theme={theme} />,
    },
  ];
  const navigate = useNavigate();
  const { templateId, templateVersionId } = useParams();
  const dispatch = useAppDispatch();

  const [menuAnchorEl, setMenuAnchorEl] = React.useState<HTMLElement | null>(
    null
  );

  const handleMoreMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setMenuAnchorEl(null);
  };

  const handleClickMoreMenuItem = (nodes: FolderT) => (value: string) => {
    if (value === 'DELETE') {
      dispatch(
        setToastNotification({
          open: true,
          message: `"${nodes.name}" removed from Course Content.`,
          type: 'success',
        })
      );
      dispatch(actionRemoveFolderItem(nodes));
    }
    if (value === 'ACTIVITY_SETTINGS') {
      dispatch(actionSelectFolderItem({ checked: true, nodes }));
      navigate(
        `/templates/${templateId}/activity-settings/${templateVersionId}`
      );
    }
  };

  return (
    <>
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="span"
        style={{ margin: '0 15px 0 auto' }}
        onClick={handleMoreMenuClick}
      >
        <MoreVert color="primary" />
      </IconButton>
      <DropdownMenu
        key={nodes.id}
        labelColor={theme.palette.aqua.main}
        open={Boolean(menuAnchorEl)}
        anchorEl={menuAnchorEl}
        options={options}
        onItemClick={handleClickMoreMenuItem(nodes)}
        onClose={handleClose}
      />
    </>
  );
};

type InputPropsT = SwitchBaseProps['inputProps'] & {
  'data-testid'?: string;
};

const RecursiveTreeView = () => {
  const { templateId, templateVersionId } = useParams();
  const selectedTemplateViewType = useAppSelector(getSelectedTemplateViewType);
  const dispatch = useAppDispatch();
  const { data } = useGetLessonsQuery({
    viewTypeId: selectedTemplateViewType?.id,
    templateId,
    templateVersionId,
  });
  const [addFolder] = useAddFolderMutation();
  const [reorderItems] = useReorderItemsMutation();

  const {
    items: folders,
    selected,
    expanded,
    reorganizeMode,
    canReorganize,
    reorderedItems,
  } = useAppSelector(getLessons);

  const parseDataToFolder = (data: FolderT[] | undefined): FolderT => {
    const children = data ?? [];
    return {
      id: '0',
      name: 'Root',
      type: 'root',
      children,
    };
  };

  useEffect(() => {
    const folder: FolderT = parseDataToFolder(data);
    dispatch(setLessons(folder));
  }, [data, dispatch]);

  useEffect(() => {
    if (reorderedItems && reorderedItems.length > 0) {
      reorderItems(reorderedItems).then((res) => undefined);
    }
  }, [reorderItems, reorderedItems]);

  const integrationHubUrl =
    useAppSelector(selectIntegrationHubUrl) || 'not-configured';

  const initialDepth = 1;

  const handleToggle = useCallback(
    (e: React.SyntheticEvent, nodeId: string[]) =>
      dispatch(actionExpandFolderItem(nodeId)),
    [dispatch]
  );

  const getOnChange = useCallback(
    (checked: boolean, nodes: FolderT) => {
      dispatch(actionSelectFolderItem({ checked, nodes }));
    },
    [dispatch]
  );

  const reorganizeFolders = useCallback(
    (direction: FolderMoveDirectionT) =>
      dispatch(actionMoveFolderItem(direction)),
    [dispatch]
  );

  const onNodeUp = useCallback(
    () => reorganizeFolders('up'),
    [reorganizeFolders]
  );
  const onNodeDoubleUp = useCallback(
    () => reorganizeFolders('double-up'),
    [reorganizeFolders]
  );
  const onNodeDown = useCallback(
    () => reorganizeFolders('down'),
    [reorganizeFolders]
  );
  const onNodeDoubleDown = useCallback(
    () => reorganizeFolders('double-down'),
    [reorganizeFolders]
  );

  const onReorganizeClick = useCallback(() => {
    dispatch(setIsSideBarOpen(true));
  }, [dispatch]);

  const addFolderItem = useCallback(
    (
      name: string,
      type: FolderT['type'],
      parentId: string,
      id: string,
      sequence?: number
    ) => {
      const file = {
        id,
        name,
        type,
        parentId,
        children: [],
        sequence,
      };
      dispatch(actionAddFolderItem(file));
    },
    [dispatch]
  );

  const handleAddFolder = useCallback(
    async (name: string, parentId: string) => {
      const templateViewTypeId = selectedTemplateViewType?.id;
      if (templateId && templateVersionId && templateViewTypeId) {
        const payload: TemplateNodeT = {
          templateId,
          templateVersionId,
          templateViewTypeId,
          name,
        };

        if (parentId && parentId !== '0') {
          payload.parentNodeId = parentId;
        }
        const { id, sequence } = await addFolder(payload).unwrap();
        if (id) addFolderItem(name, 'folder', parentId, id, sequence);
      }
    },
    [
      addFolder,
      addFolderItem,
      selectedTemplateViewType?.id,
      templateId,
      templateVersionId,
    ]
  );

  const addAssessment = useCallback(
    (name: string, parentId: string) =>
      addFolderItem(name, 'assessment', parentId, generateId()),
    [addFolderItem]
  );

  const addUrl = useCallback(
    (name: string, parentId: string) =>
      addFolderItem(name, 'url', parentId, generateId()),
    [addFolderItem]
  );

  const addActivity = useCallback(
    (name: string, parentId: string) =>
      addFolderItem(name, 'activity', parentId, generateId()),
    [addFolderItem]
  );

  const handleActivityClickPost = useCallback(
    (activityId: string) => {
      const caToken = getCaTokenCookie();
      launchActivity(activityId, caToken, integrationHubUrl);
    },
    [integrationHubUrl]
  );

  const renderTree = useCallback(
    (nodes: FolderT, depth: number) => {
      const isFolder = nodes.type === 'folder';
      const Label = () =>
        isFolder ? (
          <FolderLabel>{nodes.name}</FolderLabel>
        ) : (
          <FolderItemLabel
            theme={theme}
            onClick={() => handleActivityClickPost(nodes.id)}
          >
            {nodes.name}
          </FolderItemLabel>
        );
      const isChecked = selected.some((item: string) => item === nodes.id);
      const isExpanded = expanded.some((item: string) => item === nodes.id);

      return (
        <StyledTreeItem
          theme={theme}
          key={nodes.id}
          nodeId={nodes.id}
          label={
            <TreeItemsWrapper>
              <FormControlLabel
                control={
                  <Span>
                    <Checkbox
                      sx={{ marginLeft: '10px' }}
                      checked={isChecked}
                      onChange={(event) =>
                        getOnChange(event.currentTarget.checked, nodes)
                      }
                      size="small"
                      onClick={(e) => e.stopPropagation()}
                      inputProps={
                        {
                          'data-testid': String(nodes.name + ' checkbox'),
                        } as InputPropsT
                      }
                    />
                  </Span>
                }
                label=""
                key={nodes.id}
              />
              {isFolder && (
                <ExpandWrapper>
                  {isExpanded ? (
                    <ExpandMoreIcon color="primary" />
                  ) : (
                    <ChevronRightIcon color="primary" />
                  )}
                </ExpandWrapper>
              )}
              {nodes.type === 'url' && <LinkIcon />}
              {nodes.type === 'assessment' && <DocumentCheckIcon />}
              {nodes.type === 'activity' && <MultidraftsIcon />}
              <Grid container alignItems="center">
                <Grid item xs={5}>
                  <Label />
                </Grid>
                <Grid item xs={4}>
                  {(nodes.activitySettingName &&
                    nodes.activitySettingRecommendedUse &&
                    nodes.activitySettingVisibility) !==
                    (null && undefined) && (
                    <RecursiveTreeViewActivitySettings nodes={nodes} />
                  )}
                </Grid>
                <Grid item xs={3}>
                  <ResourcesAndMoreMenuWrapper>
                    {!!nodes.children?.length && (
                      <TreeRecourses theme={theme}>
                        {nodes.children.length}&nbsp;resources
                      </TreeRecourses>
                    )}
                    {!isFolder && <Actions nodes={nodes} />}
                  </ResourcesAndMoreMenuWrapper>
                </Grid>
              </Grid>
            </TreeItemsWrapper>
          }
        >
          {nodes.type === 'folder' && (
            <>
              <FolderNavigatorToolbar
                isLastLevel={depth === 2}
                parentId={nodes.id}
                viewTypeId={selectedTemplateViewType?.id}
                addFolder={handleAddFolder}
                addAssessment={addAssessment}
                addUrl={addUrl}
                addActivity={addActivity}
                hasDividers
              />
              {nodes?.children?.map((node: FolderT) =>
                renderTree(node, depth + 1)
              )}
            </>
          )}
        </StyledTreeItem>
      );
    },
    [
      addActivity,
      addAssessment,
      handleAddFolder,
      addUrl,
      expanded,
      getOnChange,
      handleActivityClickPost,
      selected,
      selectedTemplateViewType?.id,
    ]
  );

  const treeView = useMemo(() => {
    if (folders?.children && folders.children.length) {
      return (
        <TreeWrapper>
          <TreeView expanded={expanded} onNodeToggle={handleToggle}>
            {folders?.children?.map((item: FolderT) =>
              renderTree(item, initialDepth)
            )}
          </TreeView>
          {reorganizeMode && (
            <StickyPanelWrapper>
              <MovePanel
                disabled={!canReorganize}
                onUp={onNodeUp}
                onDoubleUp={onNodeDoubleUp}
                onDown={onNodeDown}
                onDoubleDown={onNodeDoubleDown}
                onReorganize={onReorganizeClick}
              />
            </StickyPanelWrapper>
          )}
        </TreeWrapper>
      );
    }

    return (
      <TreeWrapperNoContent>
        <img
          data-testid="NoContent"
          src={emptyLessonsImage}
          alt="No lessons"
          loading="lazy"
        />
        <Box ml={10}>
          <Typography variant="h1" mb={3} sx={{ fontWeight: 'bold' }}>
            Set Up Resource Structure
          </Typography>
          <Typography variant="h2">
            Organize folders for this template.
          </Typography>
        </Box>
      </TreeWrapperNoContent>
    );
  }, [
    folders?.children,
    expanded,
    handleToggle,
    renderTree,
    canReorganize,
    onNodeDoubleDown,
    onNodeUp,
    onNodeDown,
    onNodeDoubleUp,
    reorganizeMode,
    onReorganizeClick,
  ]);

  return (
    <>
      <Div theme={theme}>
        <FolderNavigatorToolbar
          parentId={folders.id}
          addFolder={handleAddFolder}
          addAssessment={addAssessment}
          viewTypeId={selectedTemplateViewType?.id}
          addUrl={addUrl}
          addActivity={addActivity}
        />
      </Div>
      {treeView}
    </>
  );
};

export default RecursiveTreeView;
