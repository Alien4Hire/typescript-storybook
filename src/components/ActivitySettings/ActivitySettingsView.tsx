import React, { useState } from 'react';

import { Add as AddIcon } from '@mui/icons-material';
import { Box, Button, Divider, Typography } from '@mui/material';

import { ActivitySettingsHeader } from './ActivitySettingsHeader';
import { RuleContainer } from './RuleContainer';
import { CreateSettingCard } from '../CreateSettingCard/CreateSettingCard';
import { Modal, MlModalPropsT } from '../Modal/Modal';
import generateUuid from '../../util/uuid';
import {
  AddActivitySettingBodyParamsT,
  ActivitySettingT,
} from '../../../../app/types/activitySettings';

type ActivitySettingsViewPropsT = {
  testId?: string;
  activitySettingsList: ActivitySettingT[];
  handleClickCancel: () => void;
  handleClickSave: () => void;
  handleCreateActivitySetting: (
    newActivitySetting: AddActivitySettingBodyParamsT
  ) => void;
  handleDeleteActivitySetting: (id: string) => void;
  selectedActivitySetting: string;
  setSelectedActivitySetting: (id: string) => void;
};

const ActivitySettingsView = ({
  testId,
  handleClickCancel,
  handleClickSave,
  handleCreateActivitySetting,
  activitySettingsList,
  handleDeleteActivitySetting,
  selectedActivitySetting,
  setSelectedActivitySetting,
}: ActivitySettingsViewPropsT) => {
  const [newSettingCardVisible, setNewSettingCardVisible] =
    useState<boolean>(false);
  const [modalSettings, setModalSettings] = useState<MlModalPropsT>({
    open: false,
    title: '',
    children: '',
    actions: [],
  });

  const handleNewSettingClick = () => setNewSettingCardVisible(true);

  const handleCloseModal = () =>
    setModalSettings({
      open: false,
      title: '',
      children: null,
      actions: [],
    });

  const handleClickDelete = async (
    activitySetting: ActivitySettingT,
    force?: boolean
  ) => {
    // TODO: Check if the setting was assigned to activities.
    const numberOfResourcesBeingUsed = 10;
    if (numberOfResourcesBeingUsed > 0 && !force) {
      setModalSettings({
        open: true,
        title: `Delete "${activitySetting.name}"`,
        children: (
          <>
            <Typography>
              This activity setting is being used by{' '}
              {numberOfResourcesBeingUsed} resources. Deleting this setting will
              remove any activity settings from those resources.
            </Typography>
            <Typography sx={{ marginTop: 3 }}>
              Are you sure you want to delete “{activitySetting.name}”?
            </Typography>
          </>
        ),
        actions: [
          {
            label: "No, Don't Delete",
            variant: 'outlined',
            color: 'primary',
            onClick: () => handleCloseModal(),
          },
          {
            label: 'Yes, Delete',
            variant: 'contained',
            color: 'error',
            onClick: () => handleClickDelete(activitySetting, true),
          },
        ],
      });
    } else {
      if (activitySetting.id) {
        handleDeleteActivitySetting(activitySetting.id);
        if (force) {
          handleCloseModal();
        }
      }
    }
  };

  return (
    <Box mr={4} data-testid={testId}>
      <ActivitySettingsHeader
        onClickCancel={handleClickCancel}
        onClickSave={handleClickSave}
      />
      <Divider />
      <Box
        sx={{
          margin: '32px 0',
        }}
      >
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleNewSettingClick}
          sx={{ textTransform: 'none' }}
        >
          New activity setting
        </Button>
      </Box>
      <CreateSettingCard
        visible={newSettingCardVisible}
        setVisible={setNewSettingCardVisible}
        handleClickSave={handleCreateActivitySetting}
      />
      {activitySettingsList?.length > 0 &&
        activitySettingsList.map((data) => (
          <RuleContainer
            rule={data}
            key={generateUuid()}
            onChangeRadio={() => setSelectedActivitySetting(data.id || '')}
            onClickDelete={() => handleClickDelete(data)}
            radioChecked={selectedActivitySetting === data.id}
          />
        ))}
      <Modal {...modalSettings} onClose={() => handleCloseModal()} />
    </Box>
  );
};

export default ActivitySettingsView;
