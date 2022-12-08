import React from 'react';
import {
  MenuItem,
  SelectProps as MuiSelectProps,
  MenuItemProps as MuiMenuItemProps,
} from '@mui/material';
import { StyledSelect } from './SelectStyles';
import { theme } from '../../theme';

type OptionT = MuiMenuItemProps & {
  label: string | JSX.Element;
};

export type SelectTypeT = MuiSelectProps & {
  options?: OptionT[];
  testId?: string;
};

const Select = ({
  value,
  onChange,
  options = [],
  testId = 'Select',
  disabled = false,
}: SelectTypeT): JSX.Element => (
  <StyledSelect
    theme={theme}
    value={value}
    onChange={onChange}
    inputProps={{ 'data-testid': testId }}
    disabled={disabled}
  >
    {options.map(({ value, label }) => (
      <MenuItem value={value} key={String(value)}>
        {label}
      </MenuItem>
    ))}
  </StyledSelect>
);

export default Select;
