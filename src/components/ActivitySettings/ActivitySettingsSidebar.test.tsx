import { render, screen } from '@testing-library/react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import { ActivitySettingsSidebar } from './ActivitySettingsSidebar';

import { theme } from '../../theme';
import '../../setupTests';

const baseProps = {
  handleDrawerClose: () => {},
  handleDrawerOpen: () => {},
  isOpen: true,
  title: 'Selected Resources',
};

const renderComponent = (moreProps?: any) => {
  const props = { ...baseProps, ...moreProps };

  return render(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <ActivitySettingsSidebar {...props} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

describe('<ActivitySettingsSidebar />', () => {
  it('renders without crashing', () => {
    const view = renderComponent();
    expect(view).toMatchSnapshot();
  });

  it('should have a title', () => {
    renderComponent();
    expect(screen.getByText('Selected Resources')).toBeInTheDocument();
  });

  it('should have a close sidebar button', () => {
    renderComponent();
    const closeToggleButton = screen.getByTestId('toggle-close-button');

    expect(closeToggleButton).toBeInTheDocument();
  });

  it('should have an open sidebar button', () => {
    // re-render the same component with different props
    renderComponent({ isOpen: false });
    const openToggleButton = screen.getByTestId('toggle-open-button');

    expect(openToggleButton).toBeInTheDocument();
  });

  it('should have a data-test-id', () => {
    const testId = 'test-activity-settings-sidebar';
    renderComponent({ testId });
    const element = screen.getByTestId(testId);
    expect(element).toBeInTheDocument();
  });
});
