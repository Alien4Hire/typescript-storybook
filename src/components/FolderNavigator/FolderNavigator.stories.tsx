import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FolderNavigator from './FolderNavigator';
import { store } from '../../app/store';

export default {
  title: 'Component/FolderNavigator',
  component: FolderNavigator,
} as ComponentMeta<typeof FolderNavigator>;

const Template: ComponentStory<typeof FolderNavigator> = () => (
  <Provider store={store}>
    <Router>
      <FolderNavigator />
    </Router>
  </Provider>
);

export const Primary = Template.bind({});
Primary.args = {};
