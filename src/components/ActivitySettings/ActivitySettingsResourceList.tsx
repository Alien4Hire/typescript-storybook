import React from 'react';

import { Typography, Box } from '@mui/material';
import { theme } from '../../theme';

export type ResourceT = {
  id: string;
  name: string;
  type: string;
  // TODO: complete when know the content of an activity
};

type ResourceItemPropsT = { item: ResourceT };

const ResourceItem = ({ item }: ResourceItemPropsT): JSX.Element => (
  <Box
    data-testid="resource-item-id"
    key={item.id}
    sx={{
      paddingTop: '20px',
      paddingBottom: '20px',
      borderBottom: `1px solid ${theme.palette.gray.light}`,
      width: '100%',
    }}
  >
    <Typography variant="textBasic">{item.name}</Typography>
  </Box>
);

type ActivitySettingsResourceListPropsT = {
  resources: Array<ResourceT>;
  testId: string;
};

export const ActivitySettingsResourceList = ({
  resources,
  testId,
}: ActivitySettingsResourceListPropsT) => {
  return (
    <Box
      data-testid={testId}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingLeft: '10px',
        paddingRight: '32px',
        width: '100%',
      }}
    >
      {resources.map((item) => (
        <ResourceItem key={item.id} item={item} />
      ))}
    </Box>
  );
};
