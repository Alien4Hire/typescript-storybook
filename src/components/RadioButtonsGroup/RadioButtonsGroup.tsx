import RadioGroup, {
  RadioGroupProps as MuiRadioGroupProps,
} from '@mui/material/RadioGroup';
import RadioButton from '../RadioButton';
import { RadioButtonPropsT } from '../RadioButton/RadioButton';

export type GroupPropsT = Omit<MuiRadioGroupProps, 'onChange'> & {
  value?: string;
  options?: RadioButtonPropsT[];
  checked?: boolean;
  onChange: RadioButtonPropsT['onChange'];
};

const RadioButtonsGroup = ({
  defaultValue,
  value,
  onChange,
  options = [],
  ...rest
}: GroupPropsT): JSX.Element => {
  return (
    <RadioGroup {...rest}>
      {options.map((props) => (
        <RadioButton
          {...props}
          key={props.value}
          checked={value ? props.value === value : props.value === defaultValue}
          onChange={onChange}
        />
      ))}
    </RadioGroup>
  );
};

export default RadioButtonsGroup;
