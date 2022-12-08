import { ComponentStory, ComponentMeta } from '@storybook/react';
import TemplateFormPage, { MlTemplateFormPagePropsT } from './TemplateFormPage';
import { TemplateRequestT } from '../../../../../../../app/types/templates';

export default {
  title: 'Pages/TemplateFormPage',
  component: TemplateFormPage,
} as ComponentMeta<typeof TemplateFormPage>;

const template: TemplateRequestT = {
  templateId: 'mssbwe',
  templateName: 'Chiang, Economics: Principles for a Changing World 5e',
  templateVersionName: 'Chiang, Economics: Principles for a Changing World 5e',
  description: '',
  isbn: '9781319386337',
  ebook: 'ebookurl.ebook/englishtext',
  bookAuthor: 'Andrea Lunsford',
  templateVersionCreatedBy: 'Jone Doe',
  templateVersionUpdatedAt: 'Mon, Aug 16, 1:27PM',
  productType: 'US',
  productModel: 'ef7208a5-ea0e-4039-8771-53f0dcc1de62',
  taxonomyId: 2177,
  learningObjectiveId: 'd54290b2-7488-47ad-a4e2-be15b67b50fa',
  titleType: 'National',
};

const baseArgs: MlTemplateFormPagePropsT = {
  template,
  onSave: (t: TemplateRequestT) => undefined,
  onCancel: () => undefined,
  title: 'Template Setup',
};

const Template: ComponentStory<typeof TemplateFormPage> = (args) => (
  <TemplateFormPage {...args} />
);

export const CreateTemplate = Template.bind({});
CreateTemplate.args = {};

export const TemplateDetail = Template.bind({});
TemplateDetail.args = { ...baseArgs };
