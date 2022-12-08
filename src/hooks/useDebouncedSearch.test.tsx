import { renderHook, act } from '@testing-library/react-hooks';
import useDebouncedSearch from './useDebouncedSearch';

jest.useFakeTimers();

const DELAY = 500;
let text: string;

describe('useDebouncedSearch hook', () => {
  test('Should properly debounce user input', () => {
    text = '';
    const timeoutSpy = jest.spyOn(global, 'setTimeout');

    const { result, rerender } = renderHook(() =>
      useDebouncedSearch(text, DELAY)
    );

    expect(timeoutSpy).toHaveBeenCalledWith(expect.any(Function), DELAY);

    act(() => {
      jest.runAllTimers();
    });

    expect(result.current.debouncedValue).toBe(text);

    text = 'ISBN';
    rerender();

    expect(timeoutSpy).toHaveBeenCalledWith(expect.any(Function), DELAY);

    act(() => {
      jest.runAllTimers();
    });

    expect(result.current.debouncedValue).toBe(text);

    text = 'John';
    rerender();

    expect(timeoutSpy).toHaveBeenCalledWith(expect.any(Function), DELAY);

    act(() => {
      jest.runAllTimers();
    });

    expect(result.current.debouncedValue).toBe(text);
  });
});
