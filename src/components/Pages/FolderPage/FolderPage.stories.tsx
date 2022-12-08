import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { store } from '../../../app/store';
import FolderPage from './index';

export default {
  title: 'Pages/FolderPage',
  component: FolderPage,
} as ComponentMeta<typeof FolderPage>;

const Template: ComponentStory<typeof FolderPage> = (args) => (
  <Provider store={store}>
    <Router>
      <FolderPage />
    </Router>
  </Provider>
);

export const Primary = Template.bind({});
