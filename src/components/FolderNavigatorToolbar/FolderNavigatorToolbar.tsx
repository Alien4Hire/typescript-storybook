import React, { useEffect, useCallback } from 'react';
import { Button, ButtonGroup, TextField, Typography } from '@mui/material';

import { ReactComponent as FolderAddIcon } from '../../icons/folder_add.svg';
import { ReactComponent as LinkIcon } from '../../icons/link.svg';
import { ReactComponent as DocumentCheckIcon } from '../../icons/document_check.svg';
import { ReactComponent as MultidraftsIcon } from '../../icons/multidrafts.svg';
import CsvModal, { UploadT } from './CSVModal';
import { Divider, FolderAdd, FolderForm, Wrapper } from './styles';
import { theme } from '../../theme';
import { useAddContentMutation } from '../../app/reducers/content/contentAPI';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { setToastNotification } from '../../app/reducers/appSlice/appSlice';
import { ActivityUrlT } from '../../../../app/types/content';

export type ToolbarPropsT = {
  isLastLevel?: boolean;
  parentId: string;
  viewTypeId?: string;
  addFolder: (itemForAddValue: string, parentId: string) => void;
  addAssessment: (itemForAddValue: string, parentId: string) => void;
  addUrl: (itemForAddValue: string, parentId: string) => void;
  addActivity: (itemForAddValue: string, parentId: string) => void;
  cancelAddAction?: () => void;
  hasDividers?: boolean;
};

type urlT = {
  activityId: string;
  name: string;
  tool: string;
};

type ItemForAddT = {
  label: string;
  handler: ToolbarPropsT['addActivity'];
} | null;

const FolderNavigatorToolbar = ({
  isLastLevel,
  parentId,
  viewTypeId,
  addFolder,
  addAssessment,
  addUrl,
  addActivity,
  hasDividers,
  cancelAddAction = () => {},
}: ToolbarPropsT): JSX.Element => {
  const [itemForAdd, setItemForAdd] = React.useState<ItemForAddT>(null);
  const [itemForAddValue, setItemForAddValue] = React.useState('');
  const [csvModalOpen, setCsvModalOpen] = React.useState(false);
  const [uploadList, setUploadList] = React.useState<UploadT[]>([]);
  const [addContent] = useAddContentMutation();
  const [activitiesURLList, setActivitiesURLList] = React.useState<urlT[]>([]);
  const { templateId, templateVersionId } = useParams();
  const dispatch = useAppDispatch();

  const handleItemForAddChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => setItemForAddValue(e.target.value);

  const handleCancelAddAction = useCallback(() => {
    cancelAddAction();
    if (itemForAdd) {
      setItemForAdd(null);
      setItemForAddValue('');
    }
  }, [cancelAddAction, itemForAdd]);

  const escFunction = useCallback(
    (event) => {
      if (event.keyCode === 27) {
        handleCancelAddAction();
      }
    },
    [handleCancelAddAction]
  );

  useEffect(() => {
    document.addEventListener('keydown', escFunction);

    return () => {
      document.removeEventListener('keydown', escFunction);
    };
  }, [escFunction]);

  const handleAddFolderClick = () => {
    setItemForAdd({
      label: 'Add Folder',
      handler: addFolder,
    });
  };

  const handleAddAssessmentClick = () => {
    setItemForAdd({
      label: 'Add Assessment',
      handler: addAssessment,
    });
  };

  const handleAddUrlClick = () => setCsvModalOpen(true);

  const handleAddActivityClick = () => {
    setItemForAdd({
      label: 'Add Writing Activity',
      handler: addActivity,
    });
  };

  const handleAddItem = () => {
    if (!itemForAddValue.replace(/ /g, '')) {
      return;
    }
    itemForAdd?.handler(itemForAddValue, parentId);
    setItemForAdd(null);
    setItemForAddValue('');
  };

  const handleAddActivitiesCSV = async () => {
    setActivitiesURLList([]);
    uploadList.forEach((list) => {
      const url = {
        activityId: list.url,
        name: list.title,
        tool: 'WEB_LINK',
      };
      activitiesURLList.push(url);
    });
    if (
      templateId &&
      templateVersionId &&
      parentId &&
      viewTypeId &&
      activitiesURLList
    ) {
      const payload : ActivityUrlT = {
        templateId: templateId,
        templateVersionId: templateVersionId,
        templateViewTypeId: viewTypeId,
        activities: activitiesURLList,
      };
      if (parentId && parentId !== '0') {
        payload.parentNodeId = parentId;
      }
      const data = await addContent(payload).unwrap();
      if (data) {
        dispatch(
          setToastNotification({
            open: true,
            message: 'X URL activities added',
            type: 'success',
          })
        );
        setCsvModalOpen(false);
      }
    }
  };

  return (
    <Wrapper theme={theme}>
      <FolderForm>
        <Typography variant="h4">Add:</Typography>
        <ButtonGroup>
          {!isLastLevel && (
            <>
              <Button
                sx={{ color: theme.palette.gray.veryDark }}
                startIcon={<FolderAddIcon />}
                onClick={handleAddFolderClick}
                variant="text"
              >
                Folder
              </Button>
              {hasDividers && <Divider theme={theme} />}
            </>
          )}
          <Button
            sx={{ color: theme.palette.gray.veryDark }}
            startIcon={<DocumentCheckIcon />}
            onClick={handleAddAssessmentClick}
            variant="text"
          >
            Assessment
          </Button>
          {hasDividers && <Divider theme={theme} />}
          <Button
            sx={{ color: theme.palette.gray.veryDark }}
            startIcon={<LinkIcon />}
            onClick={handleAddUrlClick}
            variant="text"
          >
            URL
          </Button>
          <CsvModal
            isCSVModalOpen={csvModalOpen}
            onCSVModalClose={() => setCsvModalOpen(false)}
            onAddActivities={handleAddActivitiesCSV}
            uploadList={uploadList}
            setUploadList={setUploadList}
          />
          {hasDividers && <Divider theme={theme} />}
          <Button
            sx={{ color: theme.palette.gray.veryDark }}
            startIcon={<MultidraftsIcon />}
            onClick={handleAddActivityClick}
            variant="text"
          >
            Writing Activity
          </Button>
        </ButtonGroup>
      </FolderForm>
      <FolderAdd theme={theme} active={!!itemForAdd}>
        <TextField
          id="add-item"
          size="small"
          label={itemForAdd?.label}
          value={itemForAddValue}
          onChange={handleItemForAddChange}
          onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
        />
        <Button
          onClick={handleAddItem}
          variant="contained"
          size="small"
          disabled={!itemForAddValue.replace(/ /g, '')}
          sx={{ marginLeft: 1 }}
        >
          Add
        </Button>
        <Button
          onClick={handleCancelAddAction}
          variant="outlined"
          size="small"
          sx={{ marginLeft: 1 }}
        >
          Cancel
        </Button>
      </FolderAdd>
    </Wrapper>
  );
};

export default FolderNavigatorToolbar;
