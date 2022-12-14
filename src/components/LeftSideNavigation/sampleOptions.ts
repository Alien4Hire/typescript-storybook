export const sampleOptions = [
  {
    searchKey: 'activitySettingsRule',
    title: 'Activity Settings Rule',
    type: 'select',
    options: [
      { value: 'any', label: 'Any Activity Settings Rule' },
      { value: 'none', label: 'No Activity Settings Rule' },
    ],
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
      { value: 'post-class', label: 'Placeholder Activities' },
    ],
    selectedValue: '',
  },
  {
    searchKey: 'prebuiltCourse',
    title: 'Prebuilt Course',
    type: 'select',
    options: [
      { value: 'any', label: 'Any Content' },
      { value: 'added', label: 'Added to Prebuilt' },
      { value: 'not-added', label: 'Not Added to Prebuilt' },
    ],
    selectedValue: '',
  },
  {
    searchKey: 'learningObjective',
    title: 'Learning Objective',
    type: 'input',
    placeholder: 'Search Learning Objective...',
    selectedValue: '',
  },
];
