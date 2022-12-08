import { MemoryRouter as Router } from 'react-router-dom';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TemplatesPageView, {
  MlTemplatesPageViewPropsT,
} from './TemplatesPageView';
import { templates } from './sampleData';

export default {
  title: 'Pages/TemplatesPage',
  component: TemplatesPageView,
} as ComponentMeta<typeof TemplatesPageView>;

const baseArgs: MlTemplatesPageViewPropsT = {
  templates,
  page: 0,
  setPage: (val: number) => {},
  altText: '',
  hasMore: false,
  onChange: (val: string) => {},
};

const Template: ComponentStory<typeof TemplatesPageView> = (args) => (
  <Router>
    <TemplatesPageView {...args} />
  </Router>
);

export const Primary = Template.bind({});
Primary.args = { ...baseArgs };

export const Loading = Template.bind({});
Loading.args = {
  ...baseArgs,
  altText: 'Loading server data',
};

export const Error = Template.bind({});
Error.args = {
  ...baseArgs,
  altText: 'There was an error',
};
