import { ComponentMeta, ComponentStory } from '@storybook/react';

import ProviderWrapper from '../../util/ProviderWrapper';
import Component, { ResultListPropsT } from './ResultList';

export default {
  title: 'Component/ResultList',
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
  return <Component {...args} />;
};

export const ResultList = Template.bind({});
ResultList.args = {
  result: [
    {
      checked: false,
      checkedValue: 'test',
      activityName: 'Ch 1 LearningCurve Adaptive Quiz',
      contentId: '1',
      modifiedDate: 'xx/xx/xxxxx at xx:xx',
      addedToLibrary: false,
    },
    {
      checked: false,
      checkedValue: 'test',
      activityName: 'Ch 1 LearningCurve Adaptive Quiz',
      contentId: '2',
      modifiedDate: 'xx/xx/xxxxx at xx:xx',
      addedToLibrary: true,
    },
    {
      checked: true,
      checkedValue: 'test',
      activityName: 'Ch 1 LearningCurve Adaptive Quiz',
      contentId: '3',
      modifiedDate: 'xx/xx/xxxxx at xx:xx',
      addedToLibrary: false,
    },
  ],
  onAddResource: () => {},
  itemsOnPage: 100,
} as ResultListPropsT;
