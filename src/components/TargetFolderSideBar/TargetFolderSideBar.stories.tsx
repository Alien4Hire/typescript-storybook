import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TargetFolderSideBar from './TargetFolderSideBar';

export default {
  title: 'Component/TargetFolderSideBar',
  component: TargetFolderSideBar,
} as ComponentMeta<typeof TargetFolderSideBar>;

const folders = [
  {
    id: '14',
    name: 'Goal 1',
    type: 'folder' as 'folder',
    children: [
      {
        id: '15',
        name: 'Instructor Guide & FAQ',
        type: 'folder' as 'folder',
        children: [
          {
            id: '16',
            name: 'Intro quiz',
            type: 'folder' as 'folder',
            children: [],
          },
        ],
      },
      {
        id: '18',
        name: 'Intro Survey',
        type: 'folder' as 'folder',
        children: [],
      },
      {
        id: '3',
        name: 'Checkpoint Survey #1',
        type: 'folder' as 'folder',
        children: [],
      },
      {
        id: '4',
        name: 'Checkpoint Survey #2',
        type: 'folder' as 'folder',
        children: [],
      },
      {
        id: '5',
        name: 'Checkpoint Survey #3',
        type: 'folder' as 'folder',
        children: [],
      },
      {
        id: '9',
        name: 'Checkpoint Survey #4',
        type: 'folder' as 'folder',
        children: [],
      },
    ],
  },
  {
    id: '7',
    name: 'Training, Math and Graphing Review',
    type: 'folder' as 'folder',
    children: [
      {
        id: '12',
        name: 'Checkpoint Survey #3',
        type: 'folder' as 'folder',
        children: [],
      },
      {
        id: '13',
        name: 'Checkpoint Survey #4',
        type: 'folder' as 'folder',
        children: [],
      },
    ],
  },
  {
    id: '21',
    name: 'Goal 2',
    type: 'folder' as 'folder',
    children: [
      {
        id: '22',
        name: 'Instructor Guide & FAQ',
        type: 'folder' as 'folder',
        children: [],
      },
      {
        id: '25',
        name: 'Intro Survey',
        type: 'folder' as 'folder',
        children: [],
      },
    ],
  },
];
const Template: ComponentStory<typeof TargetFolderSideBar> = (args) => (
  <Router>
    <TargetFolderSideBar {...args} folders={folders} isOpen={true} />
  </Router>
);
export const FolderSideBar = Template.bind({});
