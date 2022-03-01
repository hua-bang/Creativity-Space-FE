import { useState } from 'react';

function useCounter(
  initialValue: number
): [number, () => void, () => void] {
  const [ count, setCount ] = useState(initialValue);

  const add = () => {
    setCount(prev => prev + 1);
  };

  const dec = () => {
    setCount(prev => prev - 1);
  };

  return [
    count,
    add,
    dec
  ];
}

export default useCounter;