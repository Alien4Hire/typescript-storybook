import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';

import FilterResourcesView from './FilterResourcesView';
import { store } from '../../app/store';
import { sampleOptions } from '../LeftSideNavigation/sampleOptions';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Component/FilterResources',
  component: FilterResourcesView,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as ComponentMeta<typeof FilterResourcesView>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FilterResourcesView> = () => {
  const baseProps = {
    sections: sampleOptions,
    onSelectHandle: () => {},
    closeHandler: () => {},
    keywordSearch: '',
    keywordSearchHandler: () => {},
    searchHandle: () => {},
  };
  return (
    <Provider store={store}>
      <Router>
        <FilterResourcesView {...baseProps} />
      </Router>
    </Provider>
  );
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  // label: 'FilterResources',
};
