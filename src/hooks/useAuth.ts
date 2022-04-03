import { useCallback } from 'react';
import useRole from '@/hooks/useRole';

function getAuthKeys(auth: string | string []) {
  return Array.isArray(auth) ? auth : [auth];
}

function useAuth() {
  const authConfig = useRole() || [];
  const hasAuth = useCallback(
    (auth: string | string[]) =>
      getAuthKeys(auth).some(key => authConfig.includes(key)),
    [authConfig]
  );

  const ret: [typeof authConfig, typeof hasAuth] = [
    authConfig,
    hasAuth
  ];
  return ret;
}

export default useAuth;