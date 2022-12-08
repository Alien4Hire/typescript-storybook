import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ActivitySettingsView from './ActivitySettingsView';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  useGetActivitySettingsQuery,
  useDeleteActivitySettingMutation,
  useAddActivitySettingMutation,
  useAssignActivitiesMutation,
} from '../../app/reducers/activitySettings/activitySettingsAPI';
import { getSelectedLessonsIds } from '../../app/reducers/lessons/lessonsSlice';
import { setToastNotification } from '../../app/reducers/appSlice/appSlice';
import { AddActivitySettingBodyParamsT } from '../../../../app/types/activitySettings';

type ActivitySettingsPropsT = {
  testId?: string;
};

const ActivitySettings = ({ testId }: ActivitySettingsPropsT) => {
  const dispatch = useAppDispatch();
  const { templateId, templateVersionId } = useParams();
  const navigate = useNavigate();
  const selectedLessonsIds = useAppSelector(getSelectedLessonsIds);
  const { data: activitySettingsList = [], refetch } =
    useGetActivitySettingsQuery({ templateId, templateVersionId });
  const [deleteActivitySetting] = useDeleteActivitySettingMutation();
  const [addActivitySetting] = useAddActivitySettingMutation();
  const [assignActivitySetting] = useAssignActivitiesMutation();
  const [selectedActivitySetting, setSelectedActivitySetting] =
    useState<string>('');

  const handleDeleteActivitySetting = async (activitySettingId: string) => {
    if (activitySettingId) {
      const { name } = await deleteActivitySetting(activitySettingId).unwrap();
      if (name) {
        refetch();
        dispatch(
          setToastNotification({
            open: true,
            message: `"${name}" was deleted`,
            type: 'success',
          })
        );
      }
    }
  };

  const handleCreateActivitySetting = async (
    newActivitySetting: AddActivitySettingBodyParamsT
  ) => {
    if (newActivitySetting && templateId && templateVersionId) {
      const { name } = await addActivitySetting({
        ...newActivitySetting,
        templateId,
        templateVersionId,
      }).unwrap();
      if (name) {
        refetch();
        dispatch(
          setToastNotification({
            open: true,
            message: `"${name}" created`,
            type: 'success',
          })
        );
      }
    }
  };

  const handleClickSave = async () => {
    if (selectedActivitySetting && selectedLessonsIds.length > 0) {
      await assignActivitySetting({
        activitySettingId: selectedActivitySetting,
        templateNodeIds: selectedLessonsIds,
      }).unwrap();
      dispatch(
        setToastNotification({
          open: true,
          message: 'Activity(s) successfully assigned',
          type: 'success',
        })
      );
      navigate(`/templates/${templateId}/activities/${templateVersionId}`);
    } else {
      dispatch(
        setToastNotification({
          open: true,
          message: 'Please, select an activity setting!',
          type: 'warning',
        })
      );
    }
  };

  const handleClickCancel = () => {
    navigate(`/templates/${templateId}/activities/${templateVersionId}`);
  };

  return (
    <ActivitySettingsView
      testId={testId}
      activitySettingsList={activitySettingsList}
      handleClickCancel={handleClickCancel}
      handleClickSave={handleClickSave}
      handleCreateActivitySetting={handleCreateActivitySetting}
      handleDeleteActivitySetting={handleDeleteActivitySetting}
      selectedActivitySetting={selectedActivitySetting}
      setSelectedActivitySetting={setSelectedActivitySetting}
    />
  );
};

export default ActivitySettings;
