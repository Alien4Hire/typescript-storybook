import React from 'react';
import { Radio, FormControlLabel, RadioProps } from '@mui/material';

import { ReactComponent as CheckboxChecked } from '../../icons/checkbox_checked.svg';

export type RadioButtonPropsT = RadioProps & {
  value?: string;
  label: string;
  testId?: string;
  ariaLabel?: string;
};

type RadioNativeProps = React.InputHTMLAttributes<HTMLInputElement> & {
  'data-testid'?: string;
};

const RadioButton = ({
  value,
  checked,
  onChange,
  className,
  label,
  testId = 'RadioButton',
  color,
  disabled = false,
  ariaLabel,
  ...rest
}: RadioButtonPropsT) => {
  return (
    <FormControlLabel
      control={
        <Radio
          value={value}
          checked={checked}
          className={className}
          size="small"
          inputProps={
            {
              'data-testid': testId,
              'aria-label': ariaLabel,
            } as RadioNativeProps
          }
          onChange={onChange}
          checkedIcon={<CheckboxChecked width={24} height={24} />}
          color={color}
          disabled={disabled}
          {...rest}
        />
      }
      label={label}
    />
  );
};

export default RadioButton;
