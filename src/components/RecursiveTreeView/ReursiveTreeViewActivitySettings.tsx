import React from 'react';

import { Box, Typography, Tooltip } from '@mui/material';

import { truncate } from '../../util/string';
import { FolderT } from '../../util/folderTree';
import { theme } from '../../theme';
import { ActivitySettingInfoWrapper } from './RecursiveTreeView.styles';

type MlRecursiveTreeViewActivitySettingsPropsT = {
  nodes: FolderT;
  testId?: string;
};

const RecursiveTreeViewActivitySettings = ({
  nodes,
  testId = '',
}: MlRecursiveTreeViewActivitySettingsPropsT) => {
  return (
    <Box
      data-testid={testId}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <ActivitySettingInfoWrapper>
        <Typography
          variant="textBasic"
          sx={{
            color: theme.palette.gray.veryDark,
            lineHeight: '24px',
          }}
        >
          Activity Setting:
        </Typography>
        <Tooltip title={`${nodes.activitySettingName}`}>
          <Typography variant="h4">
            {truncate(nodes.activitySettingName || '', 25)}
          </Typography>
        </Tooltip>
      </ActivitySettingInfoWrapper>
      <ActivitySettingInfoWrapper>
        <Typography
          variant="textBasic"
          sx={{
            color: theme.palette.gray.veryDark,
            lineHeight: '24px',
          }}
        >
          Recommend Use:
        </Typography>
        <Typography variant="h4">
          {nodes.activitySettingRecommendedUse}
        </Typography>
      </ActivitySettingInfoWrapper>
      <ActivitySettingInfoWrapper>
        <Typography
          variant="textBasic"
          sx={{
            color: theme.palette.gray.veryDark,
            lineHeight: '24px',
          }}
        >
          Visibility:
        </Typography>
        <Typography variant="h4">
          {nodes.activitySettingVisibility ? 'Available' : 'Hidden'}
        </Typography>
      </ActivitySettingInfoWrapper>
    </Box>
  );
};

export default RecursiveTreeViewActivitySettings;
