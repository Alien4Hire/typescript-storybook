import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FolderDropdown from './FolderDropdown';
import { store } from '../../app/store';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default {
  title: 'Component/FolderDropdown',
  component: FolderDropdown,
} as ComponentMeta<typeof FolderDropdown>;

const Template: ComponentStory<typeof FolderDropdown> = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleItemClick = () => {};

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Provider store={store}>
      <Router>
        <IconButton aria-label="more" aria-haspopup onClick={handleClick}>
          <AddIcon />
        </IconButton>
        <FolderDropdown
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onItemClick={handleItemClick}
          onClose={handleClose}
        />
      </Router>
    </Provider>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
