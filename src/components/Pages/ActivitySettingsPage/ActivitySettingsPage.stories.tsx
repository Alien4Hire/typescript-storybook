import * as React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ActivitySettingsPage from '.';

export default {
  title: 'Pages/ActivitySettingsPage',
  component: ActivitySettingsPage,
} as ComponentMeta<typeof ActivitySettingsPage>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ActivitySettingsPage> = () => {
  return (
    <Provider store={store}>
      <Router>
        <ActivitySettingsPage />
      </Router>
    </Provider>
  );
};

export const Primary = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
