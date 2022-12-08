import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {} from '../../../app/reducers/login/loginSlice';

import LoginPageView from './LoginPageView';

export default {
  title: 'Pages/LoginPage',
  component: LoginPageView,
} as ComponentMeta<typeof LoginPageView>;

const Template: ComponentStory<typeof LoginPageView> = () => (
  <LoginPageView
    user={undefined}
    googleClientId={'mock-google-id'}
    loadingGoogle={false}
    onSuccessHandler={function (
      response: google.accounts.id.CredentialResponse
    ): void {
      throw new Error('Function not implemented.');
    }}
    onFailureHandler={function (error: any): void {
      throw new Error('Function not implemented.');
    }}
  />
);

export const Primary = Template.bind({});
