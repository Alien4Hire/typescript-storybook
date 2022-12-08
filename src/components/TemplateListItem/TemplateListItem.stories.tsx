import { ComponentStory, ComponentMeta } from '@storybook/react';
import TemplateListItem, { MlTemplateListItemPropsT } from './TemplateListItem';
// import { TemplateRequestT } from '../../../../app/types/templates';
import { MemoryRouter as Router } from 'react-router-dom';
import { templates } from '../Pages/TemplatesPage/sampleData';

export default {
  title: 'Component/TemplateListItem',
  component: TemplateListItem,
} as ComponentMeta<typeof TemplateListItem>;

// const template: TemplateRequestT = {
//   templateId: 'mssbwe',
//   templateVersionName: 'Chiang, Economics: Principles for a Changing World 5e',
//   templateName: 'Chiang, Economics: Principles for a Changing World 5e',
//   description: '',
//   isbn: '9781319386337',
//   ebook: 'ebookurl.ebook/englishtext',
//   bookAuthor: 'Andrea Lunsford',
//   productType: 'US',
//   productModel: 'QUALITATIVE',
//   taxonomyId: 2177,
//   learningObjectiveId: 'collection',
//   titleType: 'National',
//   templateVersionCreatedBy: 'Jone Doe',
//   templateVersionShortId: 'mssbwe',
//   templateVersionUpdatedAt: '2022-04-26 14:09:01.998256+00',
// };

const templateWithVersions = templates[0];

const baseArgs: MlTemplateListItemPropsT = {
  template: templateWithVersions,
  onCopyClick: (id) => {},
  onSettingClick: (id) => {},
};

const Template: ComponentStory<typeof TemplateListItem> = (args) => (
  <Router>
    <TemplateListItem {...args} />
  </Router>
);

export const Primary = Template.bind({});
Primary.args = { ...baseArgs };
