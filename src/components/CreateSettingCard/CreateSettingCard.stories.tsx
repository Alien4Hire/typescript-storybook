import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CreateSettingCard } from './CreateSettingCard';

export default {
  title: 'Component/CreateSettingCard',
  component: CreateSettingCard,
  argTypes: {
    visible: { control: 'visible' },
    setVisible: { control: 'setVisible' },
  },
} as ComponentMeta<typeof CreateSettingCard>;

const Template: ComponentStory<typeof CreateSettingCard> = (args) => (
  <CreateSettingCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  visible: true,
  setVisible: () => null,
  handleClickSave: () => null,
};
