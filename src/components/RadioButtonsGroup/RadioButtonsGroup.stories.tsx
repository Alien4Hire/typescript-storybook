import React from 'react';
import { useArgs } from '@storybook/client-api';

import RadioButtonsGroup from './RadioButtonsGroup';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Component/RadioButtonsGroup',
  component: RadioButtonsGroup,
} as ComponentMeta<typeof RadioButtonsGroup>;

const Template: ComponentStory<typeof RadioButtonsGroup> = (args) => {
  const [, updateArgs] = useArgs();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    updateArgs({ checked: e.target.value });
    args.onChange?.(e, checked);
  };

  return <RadioButtonsGroup {...args} onChange={handleChange} />;
};

export const View = Template.bind({});
View.args = {
  options: [
    { label: 'label1', value: '1' },
    { label: 'label2', value: '2' },
  ],
  value: '2',
};
