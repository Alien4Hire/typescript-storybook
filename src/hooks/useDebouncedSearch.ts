import { useEffect, useState } from 'react';

const useDebouncedSearch = (
  value: string,
  delay: number
): { debouncedValue: string } => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return { debouncedValue };
};

export default useDebouncedSearch;
