import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import '../../setupTests';
import { theme } from '../../theme';
import NoFilterResult from './NoFilterResult';

const renderComponent = () => {
  const props = {};

  return render(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <NoFilterResult {...props} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

describe('<NoFilterResult />', () => {
  it('renders without crashing', () => {
    const view = renderComponent();
    expect(view).toMatchSnapshot();
  });

  it('should have a Heading', () => {
    renderComponent();
    expect(
      screen.getByText('No items matched your criteria.')
    ).toBeInTheDocument();
  });

  it('should have a text in the Description', () => {
    renderComponent();
    expect(
      screen.getByText('Double check your filters and try again.')
    ).toBeInTheDocument();
  });
});
