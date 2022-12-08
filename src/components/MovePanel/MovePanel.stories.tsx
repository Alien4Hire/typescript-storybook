import { ComponentStory, ComponentMeta } from '@storybook/react';

import MovePanel from './MovePanel';

export default {
  title: 'Component/MovePanel',
  component: MovePanel,
  argTypes: {
    onUp: { action: 'onUp' },
    onDown: { action: 'onDown' },
    onDoubleUp: { action: 'onDoubleUp' },
    onDoubleDown: { action: 'onDoubleDown' },
    onReorganize: { action: 'onReorganize' },
  },
} as ComponentMeta<typeof MovePanel>;

const Template: ComponentStory<typeof MovePanel> = (args) => (
  <div style={{ height: '150px', width: '150px' }}>
    <MovePanel {...args} />
  </div>
);

export const MovePanelView = Template.bind({});
