import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import NavBarElement from './NavBar';
import ProviderWrapper from '../../util/ProviderWrapper';

export default {
  title: 'Component/NavBar',
  component: NavBarElement,
} as ComponentMeta<typeof NavBarElement>;

const Template: ComponentStory<typeof NavBarElement> = (args) => (
  <ProviderWrapper>
    <NavBarElement {...args} />
  </ProviderWrapper>
);

export const NavBar = Template.bind({});
NavBar.args = {
  icon: <ArrowBackIcon />,
  text: 'Activity Settings',
  link: '/',
};
