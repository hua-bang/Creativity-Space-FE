import { useState, useCallback } from 'react';
import { isFunction } from '@/utils/common';

const StorageMap = {
  localStorage,
  sessionStorage,
};

type StorageType = keyof typeof StorageMap;

interface Options<T> {
  defaultValue?: T | (() => T);
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
}

const useStorageStateByType = (storageType: StorageType) => {
  const storage = StorageMap[storageType];

  const useStorageState = <T>(
    key: string,
    options: Options<T>,
  ): [T | undefined, (value?: T | ((prev: T) => T)) => void] => {
    const { serializer = JSON.stringify, deserializer = JSON.parse } = options;

    const deserializeValue = (storageValue: string) => {
      return storageValue === 'undefined'
        ? undefined
        : deserializer(storageValue);
    };

    const storageValue = storage.getItem(key);

    const defaultValue = storageValue
      ? deserializeValue(storageValue)
      : options.defaultValue;

    const [state, setState] = useState<T>(defaultValue);

    const setLocalStorageState = useCallback(batch => {
      setState(prevState => {
        const nextState = isFunction(batch) ? batch(prevState) : batch;
        if (!nextState) {
          storage.setItem(key, serializer(''));
        } else {
          storage.setItem(key, serializer(nextState));
        }
        return nextState;
      });
    }, []);

    return [state, setLocalStorageState];
  };

  return useStorageState;
};

export default useStorageStateByType;
