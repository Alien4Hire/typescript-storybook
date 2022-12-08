import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import LeftSideNavigation from './LeftSideNavigation';

import { theme } from '../../theme';
import '../../setupTests';

const mockActionClick = jest.fn();

const baseProps = {
  title: 'Resource Structure',
  onApply: mockActionClick,
  sections: [
    {
      searchKey: 'activitySettingsRule',
      title: 'Activity Settings Rule',
      type: 'select',
      options: [
        { value: 'none', label: 'Any Activity Settings Rule' },
        { value: 'pre-class', label: 'No Activity Settings Rule' },
        { value: 'in-class', label: 'Name of Settings Rule' },
        { value: 'post-class', label: 'Name of Settings Rule' },
        { value: 'post', label: 'Name of Settings Rule' },
      ],
      selectedValue: '',
    },
  ],
  onSelect: mockActionClick,
  isOpen: true,
  onClose: mockActionClick,
  keywordSearch: '',
  setKeywordSearch: mockActionClick,
  learningSearch: '',
  setLearningSearch: mockActionClick,
};

const renderComponent = () => {
  const props = { ...baseProps };

  return render(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <LeftSideNavigation {...props} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

describe('<Modal />', () => {
  it('renders without crashing', () => {
    const view = renderComponent();
    expect(view).toMatchSnapshot();
  });

  it('should have a title', () => {
    renderComponent();
    expect(screen.getByText(baseProps.title)).toBeInTheDocument();
  });

  it('should have a text in the body', () => {
    renderComponent();
    expect(screen.getByText('Activity Settings Rule')).toBeInTheDocument();
  });

  it('should fire an event when an action gets clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByText('Any Activity Settings Rule'));
    expect(mockActionClick).toHaveBeenCalledTimes(1);
  });
});
