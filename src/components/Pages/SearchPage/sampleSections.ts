export const sampleSections = [
  {
    searchKey: 'templateId',
    title: 'Template ID',
    type: 'input',
    placeholder: 'Search Template ID...',
    selectedValue: '',
  },
  {
    searchKey: 'projectTitle',
    title: 'Project Title',
    type: 'input',
    placeholder: 'Search Project Title...',
    selectedValue: '',
  },
  {
    searchKey: 'author',
    title: 'Author',
    type: 'input',
    placeholder: 'Search Author...',
    selectedValue: '',
  },
  {
    searchKey: 'isbn',
    title: 'ISBN',
    type: 'input',
    placeholder: 'Search ISBN...',
    selectedValue: '',
  },
  {
    searchKey: 'resourceType',
    title: 'Resource Type',
    type: 'select',
    options: [
      { value: 'none', label: 'Any Resource Type' },
      { value: 'pre-class', label: 'Assessment' },
      { value: 'in-class', label: 'Diagnostic' },
      { value: 'p', label: 'File' },
      { value: 'po', label: 'In-Class Activity' },
      { value: 'pos', label: 'Interactive' },
      { value: 'post', label: 'LearningCurve' },
      { value: 'post-', label: 'Read and Practice' },
      { value: 'post-c', label: 'Reading' },
      { value: 'post-cl', label: 'Support' },
      { value: 'post-cla', label: 'Writing' },
    ],
    selectedValue: '',
  },
];