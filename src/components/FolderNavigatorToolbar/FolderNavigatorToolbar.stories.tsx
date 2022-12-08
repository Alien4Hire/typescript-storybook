import { ComponentMeta, ComponentStory } from '@storybook/react';

import FolderNavigatorToolbar from './FolderNavigatorToolbar';

export default {
  title: 'Component/FolderNavigatorToolbar',
  component: FolderNavigatorToolbar,
  argTypes: {
    addFolder: { action: 'addFolder' },
    addAssessment: { action: 'addAssessment' },
    addUrl: { action: 'addFolder' },
    addActivity: { action: 'addActivity' },
  },
} as ComponentMeta<typeof FolderNavigatorToolbar>;

const Template: ComponentStory<typeof FolderNavigatorToolbar> = (args) => {
  return <FolderNavigatorToolbar {...args} />;
};
export const Primary = Template.bind({});

Primary.args = {
  parentId: '5',
};
