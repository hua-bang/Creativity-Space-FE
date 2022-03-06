import { useSearchParams } from 'react-router-dom';

const useSearchParamByKey = (key: string) => {
  const [params] = useSearchParams();
  return params.get(key);
};

export default useSearchParamByKey;