import { useEffect } from 'react';
import useLatest from './useLatest';

const useInterval = (
  fn: (...args: any[]) => void,
  delay = 0,
  immediate = false,
) => {
  const fnRef = useLatest(fn);

  useEffect(() => {
    if (!delay) {
      return;
    }
    if (immediate) {
      fnRef.current();
    }
    const timer = setInterval(() => {
      fnRef.current();
    }, delay);

    return () => {
      clearInterval(timer);
    };
  }, [delay]);
};

export default useInterval;
