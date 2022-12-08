import React from 'react';
import { useArgs } from '@storybook/client-api';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProviderWrapper from '../../util/ProviderWrapper';
import InputElement from '.';

export default {
  title: 'Component/InputField',
  component: InputElement,
  decorators: [
    (Story) => (
      <ProviderWrapper>
        <Story />
      </ProviderWrapper>
    ),
  ],
} as ComponentMeta<typeof InputElement>;

const Template: ComponentStory<typeof InputElement> = (args) => {
  const [, updateArgs] = useArgs();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateArgs({ value: e.target.value });
    args.onChange(e);
  };

  return <InputElement {...args} onChange={onChange} />;
};

export const InputField = Template.bind({});
InputField.args = {
  label: 'Name of Activity Setting',
  placeholder: 'Enter a name for an activity setting',
  value: '',
};
