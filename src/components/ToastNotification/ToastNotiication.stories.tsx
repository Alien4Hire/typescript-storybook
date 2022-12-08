import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from '@mui/material/Button';
import { ToastNotification } from './ToastNotification';
import Stack from '@mui/material/Stack';
import { AlertColor } from '@mui/material/Alert';

export default {
  title: 'Component/ToastNotification',
  component: ToastNotification,
} as ComponentMeta<typeof ToastNotification>;

const Template: ComponentStory<typeof ToastNotification> = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [notificationType, setNotificationType] =
    React.useState<AlertColor>('success');

  const handleClick = (type: AlertColor) => {
    setOpen(true);
    setNotificationType(type);
  };

  const handleClose = () => {
    setNotificationType('success');
    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => handleClick('success')}
      >
        CLICK TO OPEN A SUCCESS NOTIFICATION
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => handleClick('error')}
      >
        CLICK TO OPEN AN ERROR NOTIFICATION
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => handleClick('warning')}
      >
        CLICK TO OPEN A WARNING NOTIFICATION
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => handleClick('info')}
      >
        CLICK TO OPEN AN INFO NOTIFICATION
      </Button>
      <ToastNotification
        open={open}
        onClose={handleClose}
        message={`${notificationType} toast notification`}
        type={notificationType}
      />
    </Stack>
  );
};

export const ToastNotificationView = Template.bind({});
