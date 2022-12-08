import { render, screen } from '@testing-library/react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import ReursiveTreeViewActivitySettings from './ReursiveTreeViewActivitySettings';

import { theme } from '../../theme';
import { FolderTypeT } from '../../util/folderTree';
import { RecommendedUseEnum } from '../../../../app/types/activitySettings';

import '../../setupTests';

const baseProps = {
  nodes: {
    id: 'aoibsdioasbd',
    name: 'Intro quiz',
    type: 'activity' as FolderTypeT,
    activitySettingName: 'Activity Setting 1',
    activitySettingRecommendedUse: 'none' as keyof typeof RecommendedUseEnum,
    activitySettingVisibility: true,
  },
};

const renderComponent = (customProps?: { testId?: string }) => {
  const props = { ...baseProps, ...customProps };

  return render(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <ReursiveTreeViewActivitySettings {...props} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

describe('<ReursiveTreeViewActivitySettings />', () => {
  it('renders without crashing', () => {
    const view = renderComponent();
    expect(view).toMatchSnapshot();
  });

  it('should have the Activity Setting name', () => {
    renderComponent();
    expect(
      screen.getByText(baseProps.nodes.activitySettingName)
    ).toBeInTheDocument();
  });

  it('should have the Activity Setting recommended use', () => {
    renderComponent();
    expect(
      screen.getByText(baseProps.nodes.activitySettingRecommendedUse)
    ).toBeInTheDocument();
  });

  it('should have the Activity Setting visibility', () => {
    renderComponent();
    expect(
      screen.getByText(
        baseProps.nodes.activitySettingVisibility ? 'Available' : 'Hidden'
      )
    ).toBeInTheDocument();
  });

  it('should have a data-test-id', () => {
    const testId = 'test-recursive-tree-view-activity-setting';
    renderComponent({ testId });
    const element = screen.getByTestId(testId);
    expect(element).toBeInTheDocument();
  });
});
