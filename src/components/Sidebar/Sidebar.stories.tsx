import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Sidebar from './Sidebar';

export default {
  title: 'Component/Sidebar',
  component: Sidebar,
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => (
  <Router>
    <Sidebar {...args} />
  </Router>
);
export const SidebarView = Template.bind({});
