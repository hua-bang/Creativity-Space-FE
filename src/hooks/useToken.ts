import useLocalStorageState from './useLocalStorage';
import { TOKEN_NAME } from '@/config/network';

const useToken = () => {
  return useLocalStorageState(TOKEN_NAME, { defaultValue: '' });
};

export default useToken;