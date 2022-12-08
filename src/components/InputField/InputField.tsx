import React from 'react';
import { StyledInput } from './InputFieldStyles';
import { theme } from '../../theme';
import { Typography } from '@mui/material';

export type MlInputFieldPropsT = {
  label: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: HTMLElement | string | null;
  disabled?: boolean;
};

const InputField = ({
  label,
  placeholder,
  value = null,
  onChange,
  disabled = false,
}: MlInputFieldPropsT) => {
  return (
    <label>
      {label && (
        <Typography
          color={theme.palette.gray.veryDark}
          variant="textBasic"
          lineHeight="20px"
        >
          {label}
        </Typography>
      )}
      <StyledInput
        disabled={disabled}
        theme={theme}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disableUnderline
      />
    </label>
  );
};

export default InputField;
