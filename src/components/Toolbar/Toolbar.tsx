import { Tab, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getLessons,
  setReorganizeMode as actionSetReorganizeMode,
} from '../../app/reducers/lessons/lessonsSlice';
import {
  getFilterStatus,
  setIsFilterOpen as actionSetIsFilterOpen,
} from '../../app/reducers/resourcesFilter/resourcesFilterSlice';
import { resetTargetFolderSideBarState } from '../../app/reducers/targetFolderSideBar/targetFolderSideBarSlice';
import { exitEditMode } from '../../app/reducers/lessons/lessonsSlice';
import { theme } from '../../theme';
import {
  Menu,
  StyledAppBar,
  StyledArrows,
  StyledButton,
  StyledCog,
  StyledRefresh,
  StyledSearch,
  StyledSelectedLabel,
  StyledSlider,
  StyledTabs,
  StyledTool,
} from './Toolbar.styles';
import { useGetTemplateViewTypesQuery } from '../../app/reducers/templateViewTypes/templateViewTypesAPI';
import {
  getSelectedTemplateViewType,
  setSelectedViewType,
} from '../../app/reducers/templateViewTypes/templateViewTypesSlice';
import { TemplateViewTypeT } from '../../../../app/types/templateViewTypes';
import { Modal, MlModalPropsT } from '../Modal/Modal';
import { useSyncTemplateViewsMutation } from '../../app/reducers/templates/templateAPI';
import { setToastNotification } from '../../app/reducers/appSlice/appSlice';

export type MlToolbarPropsT = {
  color:
    | 'default'
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'transparent'
    | string;
};

const Toolbar = ({ color }: MlToolbarPropsT) => {
  const { templateId, templateVersionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const lessons = useAppSelector(getLessons);
  const isReorganizeMode = lessons.reorganizeMode;
  const selectedNodeCount = lessons.selected.length;

  const { data: templateViewTypes = [] } =
    useGetTemplateViewTypesQuery(undefined);

  const selectedTemplateViewType = useAppSelector(getSelectedTemplateViewType);
  const [currentTab, setCurrentTab] = useState(selectedTemplateViewType?.id);
  const [modalSettings, setModalSettings] = useState<MlModalPropsT>({
    open: false,
    title: '',
    children: '',
    actions: [],
  });

  const isFilterOpen: boolean = useAppSelector(getFilterStatus);

  const onFilterResources = () => dispatch(actionSetIsFilterOpen(true));
  const onReorganizeClick = () => dispatch(actionSetReorganizeMode(true));
  const onDoneClick = () => {
    dispatch(actionSetReorganizeMode(false));
    dispatch(resetTargetFolderSideBarState());
    dispatch(exitEditMode());
  };
  const onActivitySettingsClick = () => {
    navigate(`/templates/${templateId}/activity-settings/${templateVersionId}`);
  };
  const [syncTemplateViews] = useSyncTemplateViewsMutation();

  const handleCloseModal = () =>
    setModalSettings({
      open: false,
      title: '',
      children: null,
      actions: [],
    });

  const handleClickContinueSyncToPrebuilt = async () => {
    const templateViewTypeId = templateViewTypes.find(
      (t) => t.name === 'Resource Structure'
    )?.id;
    const copyToTemplateViewTypeId = templateViewTypes.find(
      (t) => t.name === 'Prebuilt Course'
    )?.id;
    if (
      !templateViewTypeId ||
      !copyToTemplateViewTypeId ||
      !templateId ||
      !templateVersionId
    )
      return;
    const response = await syncTemplateViews({
      templateId,
      templateVersionId,
      templateViewTypeId,
      copyToTemplateViewTypeId,
    });

    if (response && response.hasOwnProperty('error')) {
      dispatch(
        setToastNotification({
          open: true,
          message: 'Sync to Prebuilt Course failed!',
          type: 'error',
        })
      );
    } else {
      dispatch(
        setToastNotification({
          open: true,
          message:
            'Your activities have been successfully synced to Prebuilt Course!',
          type: 'success',
        })
      );
    }
    handleCloseModal();
  };

  const onSyncToPrebuiltClick = () => {
    setModalSettings({
      open: true,
      title: 'Sync to Pre-built',
      children: (
        <>
          <Typography>
            Warning: This will replace any existing Pre-built course structure
            with the full Resource Structure.
          </Typography>
          <Typography sx={{ marginTop: 3 }}>
            Are you sure you want to do this?
          </Typography>
        </>
      ),
      actions: [
        {
          label: 'Cancel',
          variant: 'outlined',
          color: 'primary',
          onClick: () => handleCloseModal(),
        },
        {
          label: 'Continue',
          variant: 'contained',
          color: 'error',
          onClick: () => handleClickContinueSyncToPrebuilt(),
        },
      ],
    });
  };

  const Items = [
    {
      name: 'Filter Resources',
      component: <StyledSlider />,
      onClick: onFilterResources,
    },
    {
      name: 'Reorganize',
      component: <StyledArrows />,
      onClick: onReorganizeClick,
    },
    {
      name: 'Find and Replace',
      component: <StyledSearch />,
    },
    {
      name: 'Activity Settings',
      component: <StyledCog />,
      disabled: !(selectedNodeCount > 0),
      onClick: onActivitySettingsClick,
    },
    {
      name: selectedNodeCount ? 'Copy to Prebuilt' : 'Sync to Prebuilt',
      component: <StyledRefresh />,
      onClick: onSyncToPrebuiltClick,
    },
  ];

  const handleChangeTab = (event: React.SyntheticEvent, id: string) => {
    setCurrentTab(id);
    const tabSelected = getSelectedViewType(id);
    tabSelected && dispatch(setSelectedViewType(tabSelected));
    dispatch(actionSetReorganizeMode(false));
    dispatch(resetTargetFolderSideBarState());
    dispatch(exitEditMode());
  };

  const getSelectedViewType = (id: string): TemplateViewTypeT | undefined => {
    return templateViewTypes.find((item) => item.id === id);
  };

  const SelectedResources = () => {
    if (selectedNodeCount > 0) {
      const selectedText = `${selectedNodeCount} ${
        selectedNodeCount > 1 ? 'Resources' : 'Resource'
      } Selected`;
      return <StyledSelectedLabel>{selectedText}</StyledSelectedLabel>;
    }

    return null;
  };

  const displayDesktop = () => {
    return (
      <StyledTool>
        <Typography variant="h1">Resource Structure</Typography>
        {isReorganizeMode ? (
          <StyledButton theme={theme} variant="outlined" onClick={onDoneClick}>
            Close
          </StyledButton>
        ) : (
          <Menu theme={theme}>
            <SelectedResources />
            {Items.map((item) => (
              <Button
                key={item.name}
                startIcon={item.component}
                onClick={item.onClick}
                disabled={item.disabled}
              >
                {item.name}
              </Button>
            ))}
          </Menu>
        )}
      </StyledTool>
    );
  };

  return (
    <StyledAppBar color={color} theme={theme}>
      <StyledTabs
        value={currentTab}
        onChange={handleChangeTab}
        theme={theme}
        centered
      >
        {templateViewTypes.map((tab) => (
          <Tab key={tab.id} label={tab.name} value={tab.id} />
        ))}
      </StyledTabs>
      {!isFilterOpen && displayDesktop()}
      <Modal {...modalSettings} onClose={() => handleCloseModal()} />
    </StyledAppBar>
  );
};

export default Toolbar;
