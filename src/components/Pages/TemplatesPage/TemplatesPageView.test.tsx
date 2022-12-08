import { MemoryRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { fireEvent } from '@storybook/testing-library';
import TemplatesPageView from './TemplatesPageView';
import { templates } from './sampleData';

const props = {
  templates: templates,
  altText: 'altText',
  page: 1,
  setPage: jest.fn(),
  onChange: jest.fn(),
  hasMore: false,
};

const renderComponent = () => {
  return render(
    <Router>
      <TemplatesPageView {...props} />
    </Router>
  );
};

jest.useFakeTimers();

describe('<TemplatesPageView />', () => {
  test('Component <TemplatesPageView /> render without crashing', () => {
    const view = renderComponent();

    return expect(view).toMatchSnapshot();
  });

  test('<TemplatesPageView /> successfully SearchTextfield updates its content', async () => {
    const placeholder = 'Search for a Template';
    renderComponent();
    const searchTextField = screen.getByPlaceholderText(placeholder);

    expect(searchTextField).toBeInTheDocument();
    expect(searchTextField).toHaveTextContent('');
    expect(props.onChange).toBeCalledTimes(1);

    fireEvent.change(searchTextField, { target: { value: 'ISBN' } });

    expect((searchTextField as HTMLInputElement).value).toBe('ISBN');
    expect(props.setPage).toHaveBeenCalledWith(1);
  });
});
