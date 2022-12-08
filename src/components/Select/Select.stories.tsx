import React from 'react';
import { useArgs } from '@storybook/client-api';

import ProviderWrapper from '../../util/ProviderWrapper';
import SelectElement from '.';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SelectChangeEvent } from '@mui/material';

export default {
  title: 'Component/Select',
  component: SelectElement,
  decorators: [
    (Story) => (
      <ProviderWrapper>
        <Story />
      </ProviderWrapper>
    ),
  ],
} as ComponentMeta<typeof SelectElement>;

const Template: ComponentStory<typeof SelectElement> = (args) => {
  const [, updateArgs] = useArgs();

  const onChange = (e: SelectChangeEvent<unknown>, child: React.ReactNode) => {
    updateArgs({ value: e.target.value });
    args.onChange?.(e, child);
  };

  return <SelectElement {...args} onChange={onChange} />;
};

export const Select = Template.bind({});
Select.args = {
  value: '',
  options: [
    { label: 'Homework', value: '1' },
    { label: 'Quiz', value: '2' },
  ],
};
