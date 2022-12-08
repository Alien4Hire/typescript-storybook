import { render, screen } from '@testing-library/react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import { RuleContainer } from './RuleContainer';

import { theme } from '../../theme';
import '../../setupTests';

const baseProps = {
  rule: {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afaa',
    name: 'Setting One',
    recommendedUse: 'none',
    studentVisibility: true,
    templateId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  },
  radioChecked: false,
  onChangeRadio: () => {},
  onClickDelete: () => {},
};

const renderComponent = (customProps?: { testId?: string }) => {
  const props = { ...baseProps, ...customProps };

  return render(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <RuleContainer {...props} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

describe('<RuleContainer />', () => {
  it('renders without crashing', () => {
    const view = renderComponent();
    expect(view).toMatchSnapshot();
  });

  it('should have a rule name', () => {
    renderComponent();
    expect(screen.getByText(baseProps.rule.name)).toBeInTheDocument();
  });

  it('should have the recommended use text', () => {
    renderComponent();
    expect(screen.getByText(baseProps.rule.recommendedUse)).toBeInTheDocument();
  });

  it('should have the visibility text', () => {
    renderComponent();
    expect(
      screen.getByText(
        baseProps.rule.studentVisibility ? 'Available' : 'Hidden'
      )
    ).toBeInTheDocument();
  });

  it('should have a data-test-id', () => {
    const testId = 'test-rule';
    renderComponent({ testId });
    const element = screen.getByTestId(testId);
    expect(element).toBeInTheDocument();
  });
});
