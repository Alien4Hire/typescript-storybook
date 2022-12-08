import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import IconButton from '@mui/material/IconButton';
import { DropdownMenu } from './DropdownMenu';
import { ReactComponent as TrashIcon } from '../../icons/trash.svg';
import { ReactComponent as ListLeftIcon } from '../../icons/list_left.svg';

export default {
  title: 'Component/DropdownMenu',
  component: DropdownMenu,
} as ComponentMeta<typeof DropdownMenu>;

const Template: ComponentStory<typeof DropdownMenu> = () => {
  const options = [
    {
      label: 'Remove from Resource Structure',
      value: 'idaosnaisonf',
      icon: <TrashIcon />,
    },
    {
      label: 'Show Location in Structure',
      value: 'sodnfois',
      icon: <ListLeftIcon />,
    },
    {
      label: 'Apply Activity Setting',
      value: 'asofpafpnapon',
    },
  ];
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleItemClick = (selectedValue: string) => {
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton aria-label="more" aria-haspopup onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <DropdownMenu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        options={options}
        onItemClick={handleItemClick}
        onClose={handleClose}
      />
    </div>
  );
};

export const DropDownMenuView = Template.bind({});
