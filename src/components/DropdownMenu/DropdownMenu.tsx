import { ReactElement } from 'react';

import { Menu, MenuItem, MenuProps, ListItemIcon } from '@mui/material';
import { theme } from '../../theme';
import { ListItemTextContainer } from './DropdownMenu.styles';

export type MlDropdownMenuOptionPropsT = {
  label: string;
  value: string;
  icon?: ReactElement;
  step?: number;
};

export type MlDropdownMenuPropsT = MenuProps & {
  options: MlDropdownMenuOptionPropsT[];
  labelColor?: string;
  testId?: string;
  onItemClick: (e: string) => void;
  anchorEl: HTMLElement | null;
  onClose: () => void;
};

const ITEM_HEIGHT = 48;

export const DropdownMenu = ({
  open,
  options,
  labelColor = theme.palette.black.main,
  testId,
  onItemClick,
  anchorEl,
  onClose,
}: MlDropdownMenuPropsT) => {
  return (
    <Menu
      data-testid={testId}
      MenuListProps={{
        'aria-labelledby': 'long-button',
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          maxHeight: ITEM_HEIGHT * 4.5,
        },
      }}
    >
      {options.map((option) => (
        <MenuItem
          key={option.value}
          selected={option?.value === 'Pyxis'}
          onClick={(e) => {
            e.stopPropagation();
            onItemClick(option.value);
            onClose();
          }}
        >
          {option.icon && <ListItemIcon>{option.icon}</ListItemIcon>}
          <ListItemTextContainer option={option} color={labelColor}>
            {option.label}
          </ListItemTextContainer>
        </MenuItem>
      ))}
    </Menu>
  );
};
