import { render, screen } from '@testing-library/react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import { ActivitySettingsResourceList } from './ActivitySettingsResourceList';

import { theme } from '../../theme';
import '../../setupTests';

const data = [
  {
    id: '1',
    type: 'assessment',
    name: 'Ch 49 LearningCurve Adaptive Quiz: Nutrition, Digestion, and Absorption',
  },
  {
    id: '2',
    type: 'assessment',
    name: 'Ch 49 LearningCurve Adaptive Quiz: Nutrition, Digestion, and Absorption',
  },
];

const baseProps = {
  resources: data,
  testId: 'resource-item-list',
};

const renderComponent = () => {
  return render(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <ActivitySettingsResourceList {...baseProps} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

describe('<ActivitySettingsResourceList />', () => {
  it('renders without crashing', () => {
    const view = renderComponent();
    expect(view).toMatchSnapshot();
  });

  it('should have a data-testid', () => {
    const listTestId = 'resource-item-list';
    const itemTestId = 'resource-item-id';

    renderComponent();
    const list = screen.getByTestId(listTestId);
    const items = screen.getAllByTestId(itemTestId);
    expect(items.length).toBe(2);
    expect(list).toBeInTheDocument();
  });
});
