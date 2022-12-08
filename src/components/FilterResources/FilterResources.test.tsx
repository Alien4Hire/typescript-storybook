import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { store } from '../../app/store';
import '../../setupTests';
import { theme } from '../../theme';
import FilterResourcesView from './FilterResourcesView';
import { sampleOptions } from '../LeftSideNavigation/sampleOptions';

const baseProps = {
  sections: sampleOptions,
  onSelectHandle: () => {},
  closeHandler: () => {},
  keywordSearch: '',
  keywordSearchHandler: () => {},
  searchHandle: () => {},
};

const renderComponent = () => {
  return render(
    <Provider store={store}>
      <Router>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <FilterResourcesView {...baseProps} />
          </ThemeProvider>
        </StyledEngineProvider>
      </Router>
    </Provider>
  );
};

describe('<FilterResourcesView />', () => {
  it('renders without crashing', () => {
    const view = renderComponent();
    expect(view).toMatchSnapshot();
  });
  it('should find the Activity Settings Rule filter', async () => {
    renderComponent();
    const titleActivitySettingsRule = await screen.findByText(
      'Activity Settings Rule'
    );
    expect(titleActivitySettingsRule).toBeInTheDocument();
    const options = [
      { value: 'any', label: 'Any Activity Settings Rule' },
      { value: 'none', label: 'No Activity Settings Rule' },
    ];
    for (let index = 0; index < options.length; index++) {
      const option = await screen.findByText(options[index].label);
      expect(option).toBeInTheDocument();
    }
  });
  it('should find the Resource Type filter', async () => {
    renderComponent();
    const titleResourceType = await screen.findByText('Resource Type');
    expect(titleResourceType).toBeInTheDocument();
    const options = [
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
    ];
    for (let index = 0; index < options.length; index++) {
      const option = await screen.findByText(options[index].label);
      expect(option).toBeInTheDocument();
    }
  });
  it('should find the Prebuilt Course filter', async () => {
    renderComponent();
    const titlePrebuiltCourse = await screen.findByText('Prebuilt Course');
    expect(titlePrebuiltCourse).toBeInTheDocument();
    const options = [
      { value: 'any', label: 'Any Content' },
      { value: 'added', label: 'Added to Prebuilt' },
      { value: 'not-added', label: 'Not Added to Prebuilt' },
    ];
    for (let index = 0; index < options.length; index++) {
      const option = await screen.findByText(options[index].label);
      expect(option).toBeInTheDocument();
    }
  });
  it('should find the Learning Objective filter', async () => {
    renderComponent();
    const titleLearningObjective = await screen.findByText(
      'Learning Objective'
    );
    const placeholder = await screen.findByPlaceholderText(
      'Search Learning Objective...'
    );
    expect(titleLearningObjective).toBeInTheDocument();
    expect(placeholder).toBeInTheDocument();
  });
});
