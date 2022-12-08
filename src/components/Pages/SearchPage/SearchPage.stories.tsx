import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { store } from '../../../app/store';
import SearchPage from './index';

export default {
  title: 'Pages/SearchPage',
  component: SearchPage,
} as ComponentMeta<typeof SearchPage>;

const Template: ComponentStory<typeof SearchPage> = (args) => (
  <Provider store={store}>
    <Router>
      <SearchPage />
    </Router>
  </Provider>
);

export const Primary = Template.bind({});
