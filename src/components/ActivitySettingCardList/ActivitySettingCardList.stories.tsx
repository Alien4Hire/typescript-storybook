import React from 'react';
import { useArgs } from '@storybook/client-api';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import ProviderWrapper from '../../util/ProviderWrapper';
import { default as ListElement, mockCardsList } from './index';

export default {
  title: 'Component/ActivitySettingCardList',
  component: ListElement,
  decorators: [
    (Story) => (
      <ProviderWrapper>
        <Story />
      </ProviderWrapper>
    ),
  ],
} as ComponentMeta<typeof ListElement>;

const Template: ComponentStory<typeof ListElement> = (args) => {
  const [, updateArgs] = useArgs();

  const onChecked = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    updateArgs({ checkedId: e.target.value });
    args.onChecked?.(e, checked);
  };

  const onDelete = (id: string) => {
    const newCards = args.cards.filter((card) => card.id !== id);
    updateArgs({ cards: newCards });
    args.onDelete?.(id);
  };

  return <ListElement {...args} onChecked={onChecked} onDelete={onDelete} />;
};

export const ActivitySettingCardList = Template.bind({});
ActivitySettingCardList.args = {
  cards: mockCardsList,
  checkedId: '1',
};
