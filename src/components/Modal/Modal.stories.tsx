import { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button, Typography } from '@mui/material';
import { Modal, VariantT, ColorT } from './Modal';

export default {
  title: 'Component/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const actions = [
    {
      label: 'No',
      variant: 'contained' as VariantT,
      color: 'primary' as ColorT,
      onClick: () => {
        handleClose();
      },
    },
    {
      label: 'Yes',
      variant: 'contained' as VariantT,
      color: 'error' as ColorT,
      onClick: () => {
        handleClose();
      },
    },
  ];

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        Open modal
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        title="Title of the Modal"
        actions={actions}
      >
        <Typography variant="body2" component="span" sx={{ fontSize: 14 }}>
          This activity setting is being used by 15 resources. Deleting this
          setting will remove any activity settings from those resources. Are
          you sure you want to delete “Example activity settings rule #4?
        </Typography>
      </Modal>
    </div>
  );
};

export const ModalView = Template.bind({});
