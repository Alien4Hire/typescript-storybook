export { default } from './ResultList';

export const mockResult = {
  checked: false,
  checkedValue: 'test',
  activityName: 'LearningCurve Adaptive Quiz',
  modifiedDate: 'xx/xx/xxxxx at xx:xx',
  addedToLibrary: false,
} as const;

export const mockResultList = [...Array(10)].map((_, index) => ({
  ...mockResult,
  contentId: String(index),
  title: `Ch ${index + 1} ${mockResult.activityName}`,
}));
