import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import {
  CreateSettingCard,
  CreateSettingCardPropsT,
} from './CreateSettingCard';
import { theme } from '../../theme';
import '../../setupTests';

const baseProps = {
  visible: true,
  setVisible: () => null,
  handleClickSave: () => null,
};

const renderComponent = (props: CreateSettingCardPropsT) => {
  return render(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CreateSettingCard {...props} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

describe('<CreateSettingCard />', () => {
  it('renders without crashing', () => {
    const view = renderComponent(baseProps);
    expect(view).toMatchSnapshot();
  });

  it('can be hidden', () => {
    renderComponent({ ...baseProps, visible: false });
    expect(screen.queryByText('Name of Activity Setting')).toBeNull();
  });

  it('has a title', () => {
    renderComponent(baseProps);
    expect(screen.getByText('Name of Activity Setting')).toBeInTheDocument();
  });

  it('has a cancel button', () => {
    renderComponent(baseProps);
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('has a save button', () => {
    renderComponent(baseProps);
    expect(screen.getByText('Save Activity Setting')).toBeInTheDocument();
  });

  it('renders the Recommended Use options', () => {
    renderComponent(baseProps);
    expect(screen.getByText('Recommended Use')).toBeInTheDocument();
  });

  it('renders the Visibility options', () => {
    renderComponent(baseProps);
    expect(screen.getByText('Visibility')).toBeInTheDocument();
  });
});
