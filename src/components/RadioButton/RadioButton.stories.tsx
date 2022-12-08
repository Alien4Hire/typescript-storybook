import React from 'react';
import { useArgs } from '@storybook/client-api';

import RadioButton from '.';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Component/RadioButton',
  component: RadioButton,
} as ComponentMeta<typeof RadioButton>;

const Template: ComponentStory<typeof RadioButton> = (args) => {
  const [, updateArgs] = useArgs();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    updateArgs({ checked: args.value === e.target.value });
    args.onChange?.(e, checked);
  };

  return <RadioButton {...args} onChange={handleChange} />;
};

export const View = Template.bind({});
View.args = {
  label: 'label',
  value: '1',
  checked: false,
};
