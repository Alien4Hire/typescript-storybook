import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import NoFilterResultElement from '.';
import ProviderWrapper from '../../util/ProviderWrapper';

export default {
  title: 'Component/NoFilterResult',
  component: NoFilterResultElement,
  decorators: [
    (Story) => (
      <ProviderWrapper>
        <Story />
      </ProviderWrapper>
    ),
  ],
} as ComponentMeta<typeof NoFilterResultElement>;

const Template: ComponentStory<typeof NoFilterResultElement> = (args) => (
  <NoFilterResultElement />
);

export const ResultItem = Template.bind({});

ResultItem.args = {};
