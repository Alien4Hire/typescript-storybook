import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MemoryRouter as Router } from 'react-router-dom';
import Toolbar from './Toolbar';

export default {
  title: 'Component/Toolbar',
  component: Toolbar,
} as ComponentMeta<typeof Toolbar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Toolbar> = (args) => {
  return (
    <Router>
      <Toolbar {...args} />
    </Router>
  );
};
export const Primary = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  // data
  // label: 'Toolbar',
};
