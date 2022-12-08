import React, { useState } from 'react';

import { CssBaseline } from '@mui/material';
import { styled } from '@mui/material/styles';

import ActivitySettings from '../../ActivitySettings/ActivitySettings';
import { ActivitySettingsSidebar } from '../../ActivitySettings/ActivitySettingsSidebar';
import { ActivitySettingsResourceList } from '../../ActivitySettings/ActivitySettingsResourceList';
import { useAppSelector } from '../../../app/hooks';
import { getSelectedLessons } from '../../../app/reducers/lessons/lessonsSlice';

const StyledRoot = styled('div')`
  display: flex;
`;

const Drawer = styled('div')`
  flex-grow: 1;
`;

const ActivitySettingsPage = () => {
  const selectedLessons = useAppSelector(getSelectedLessons);
  const [drawerStatus, setDrawerStatus] = useState(true);
  const handleDrawerClose = () => {
    setDrawerStatus(false);
  };
  const handleDrawerOpen = () => {
    setDrawerStatus(true);
  };

  return (
    <StyledRoot>
      <CssBaseline />
      <Drawer>
        <ActivitySettings testId="" />
      </Drawer>
      <ActivitySettingsSidebar
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
        isOpen={drawerStatus && selectedLessons.length > 0}
        title="Selected Resources"
        testId="test-activity-settings-sidebar"
      >
        <ActivitySettingsResourceList
          testId="resource-item-list"
          resources={selectedLessons}
        />
      </ActivitySettingsSidebar>
    </StyledRoot>
  );
};

export default ActivitySettingsPage;
