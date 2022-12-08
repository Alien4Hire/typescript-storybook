import { render, screen } from '@testing-library/react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import '@testing-library/jest-dom/extend-expect';

import { theme } from '../../theme';
import CSVModal, { CsvModalT } from './CSVModal';
import '../../setupTests';

const baseProps = {
  isCSVModalOpen: true,
  onCSVModalClose: jest.fn(),
  onAddActivities: jest.fn(),
  uploadList: [],
  setUploadList: jest.fn(),
};

const renderComponent = (customProps: Partial<CsvModalT> = {}) => {
  const props = { ...baseProps, ...customProps };
  return render(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CSVModal {...props} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

describe('<CSVModal />', () => {
  it('renders without crashing', () => {
    const view = renderComponent();
    expect(view).toMatchSnapshot();
  });

  it('should have a title', () => {
    renderComponent();
    expect(screen.getByText('Add URL activities')).toBeInTheDocument();
  });

  it('should show the upload button', async () => {
    renderComponent();
    const testId = 'upload-button';
    const uploadButton = screen.getByTestId(testId);
    expect(uploadButton).toBeInTheDocument();
  });

  it('should show the download link', async () => {
    renderComponent();
    const testId = 'download-link';
    const downloadLink = screen.getByTestId(testId);
    expect(downloadLink).toBeInTheDocument();
  });

  it('should show the preview items', async () => {
    const uploadList = [
      {
        title: 'Example Activity 1',
        url: 'http://example-1.com',
      },
      {
        title: 'Example Activity 2',
        url: 'http://example-2.com',
      },
      {
        title: 'Example Activity 3',
        url: 'http://example-3.com',
      },
    ];
    renderComponent({ uploadList });
    uploadList.forEach((item, index) => {
      const listItem = screen.getByText(item.title);
      expect(listItem).toBeInTheDocument();
    });
  });
});
