import { ComponentStory, ComponentMeta } from '@storybook/react';
import SearchTextfield from './SearchTextfield';

export default {
  title: 'Component/SearchTextfield',
  component: SearchTextfield,
  argTypes: { onChange: { action: 'text changed' } },
} as ComponentMeta<typeof SearchTextfield>;

const baseArgs = {
  placeholder: 'Search for a Template',
  onChange: () => {},
  onRequestSearch: () => {},
};

const Template: ComponentStory<typeof SearchTextfield> = (args) => (
  <SearchTextfield {...args} />
);

export const Primary = Template.bind({});
Primary.args = { ...baseArgs };
