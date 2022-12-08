import React from 'react';
import { useArgs } from '@storybook/client-api';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import ProviderWrapper from '../../util/ProviderWrapper';
import CardElement from './index';

export default {
  title: 'Component/ActivitySettingCard',
  component: CardElement,
  decorators: [
    (Story) => (
      <ProviderWrapper>
        <Story />
      </ProviderWrapper>
    ),
  ],
} as ComponentMeta<typeof CardElement>;

const Template: ComponentStory<typeof CardElement> = (args) => {
  const [, updateArgs] = useArgs();

  const onChecked = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    updateArgs({ checked: true });
    args.onChecked?.(e, checked);
  };

  return <CardElement {...args} onChecked={onChecked} />;
};

export const ActivitySettingCard = Template.bind({});
ActivitySettingCard.args = {
  cardInfo: {
    id: '2',
    title: 'Example activity settings rule',
    gradingPolicy: 'Test/Quiz',
    recommendedUse: 'Post-Class',
    visibility: 'Available',
  },
  checked: false,
};
