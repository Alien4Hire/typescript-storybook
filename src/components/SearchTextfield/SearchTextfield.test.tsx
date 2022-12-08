import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import '../../setupTests';
import renderer from 'react-test-renderer';
import SearchTextfield from './SearchTextfield';

const baseProps = {
  placeholder: 'Search for a keyword',
  onChange: jest.fn(),
  onRequestSearch: jest.fn(),
};

describe('<SearchTextfield />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <SearchTextfield
          onChange={() => {}}
          onRequestSearch={() => {}}
          placeholder="Search for a Template"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    render(<SearchTextfield {...baseProps} />);
  });

  it('should call onChange fn', () => {
    render(<SearchTextfield {...baseProps} />);
    const searchField = screen.getByPlaceholderText(
      'Search for a keyword'
    ) as HTMLInputElement;

    expect(baseProps.onChange).not.toBeCalled();

    fireEvent.change(searchField, { target: { value: 'keyword' } });
    expect(searchField.value).toBe('keyword');
  });

  it('should call onRequestSearch fn', () => {
    render(<SearchTextfield {...baseProps} />);
    const searchButton = screen.getByRole('button');

    expect(baseProps.onRequestSearch).not.toBeCalled();

    fireEvent.click(searchButton);
    expect(baseProps.onRequestSearch).toBeCalledTimes(1);
  });

  it('should not call onChange fn when Enter key pressed', () => {
    render(<SearchTextfield {...baseProps} />);
    const searchField = screen.getByPlaceholderText(
      'Search for a keyword'
    ) as HTMLInputElement;

    expect(baseProps.onChange).not.toBeCalled();

    fireEvent.change(searchField, { target: { key: 'Enter' } });

    expect(baseProps.onRequestSearch).toBeCalledTimes(0);
  });
});
