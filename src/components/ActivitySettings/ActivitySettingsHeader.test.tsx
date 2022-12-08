import { render, screen } from '@testing-library/react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import { ActivitySettingsHeader } from './ActivitySettingsHeader';

import { theme } from '../../theme';
import '../../setupTests';

const baseProps = {
  onClickCancel: () => {},
  onClickSave: () => {},
};

const renderComponent = (customProps?: { testId?: string }) => {
  const props = { ...baseProps, ...customProps };

  return render(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <ActivitySettingsHeader {...props} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

describe('<ActivitySettingsHeader />', () => {
  it('renders without crashing', () => {
    const view = renderComponent();
    expect(view).toMatchSnapshot();
  });

  it('should have a title', () => {
    renderComponent();
    expect(screen.getByText('Activity Settings')).toBeInTheDocument();
  });

  it('should have a cancel button', () => {
    renderComponent();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('should have a save button', () => {
    renderComponent();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('should have a data-test-id', () => {
    const testId = 'test-activity-settings-header';
    renderComponent({ testId });
    const element = screen.getByTestId(testId);
    expect(element).toBeInTheDocument();
  });
});
