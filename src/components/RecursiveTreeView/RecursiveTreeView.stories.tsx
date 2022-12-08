import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';

import RecursiveTreeView from './RecursiveTreeView';

export default {
  title: 'Component/RecursiveTreeView',
  component: RecursiveTreeView,
} as ComponentMeta<typeof RecursiveTreeView>;

const Template: ComponentStory<typeof RecursiveTreeView> = () => (
  <Provider store={store}>
    <Router>
      <RecursiveTreeView />
    </Router>
  </Provider>
);

export const Primary = Template.bind({});
Primary.args = {};
