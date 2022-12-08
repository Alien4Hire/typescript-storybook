export { default } from './ActivitySettingCardList';

export const mockCard = {
  title: 'Example activity settings rule',
  gradingPolicy: 'Test/Quiz',
  recommendedUse: 'Post-Class',
  visibility: 'Available',
} as const;

export const mockCardsList = [...Array(5)].map((_, index) => ({
  ...mockCard,
  id: String(index),
  title: mockCard.title + ' #' + (index + 1),
}));
