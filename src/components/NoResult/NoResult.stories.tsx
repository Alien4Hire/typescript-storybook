import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import NoResultElement from '.';
import ProviderWrapper from '../../util/ProviderWrapper';

export default {
  title: 'Component/NoResult',
  component: NoResultElement,
  decorators: [
    (Story) => (
      <ProviderWrapper>
        <Story />
      </ProviderWrapper>
    ),
  ],
} as ComponentMeta<typeof NoResultElement>;

const Template: ComponentStory<typeof NoResultElement> = (args) => (
  <NoResultElement />
);

export const ResultItem = Template.bind({});

ResultItem.args = {};
