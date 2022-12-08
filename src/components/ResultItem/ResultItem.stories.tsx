import React from 'react';
import { useArgs } from '@storybook/client-api';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import ProviderWrapper from '../../util/ProviderWrapper';
import Component, { ResultItemPropsT } from './ResultItem';

export default {
  title: 'Component/ResultItem',
  component: Component,
  decorators: [
    (Story) => (
      <ProviderWrapper>
        <Story />
      </ProviderWrapper>
    ),
  ],
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => {
  const [local, updateArgs] = useArgs();

  const onCheck = () => {
    updateArgs({ checked: !local.checked });
    args.onCheck(args.contentId);
  };

  return <Component {...args} onCheck={onCheck} />;
};

export const ResultItem = Template.bind({});
ResultItem.args = {
  checked: false,
  checkedValue: 'test',
  activityName: 'Ch 1 LearningCurve Adaptive Quiz',
  contentId: 'XXXXXXXX',
  modifiedDate: 'xx/xx/xxxxx at xx:xx',
  addedToLibrary: false,
  onCheck: () => {},
  onAddResource: () => {},
} as ResultItemPropsT;
