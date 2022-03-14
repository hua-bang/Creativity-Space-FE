import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import useLogin from '@/hooks/useLogin';
import { observer } from 'mobx-react-lite';
import { Navigate, RouteObject } from 'react-router-dom';
import { Message } from '@arco-design/web-react';
import useStore from '@/hooks/useStore';
import { getUserInfo } from '@/api/user';
import SkeletonPage from '../Skeleton-Page/index';

interface AuthWrapperProps {
  auth: string | string[];
  children: RouteObject['element'];
  redirectPath?: string;
  noMatch?: ReactElement<any, any>;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({
  auth,
  children = null,
  redirectPath,
  noMatch
}) => {
  const { userStore } = useStore();
  const isLogin = useLogin();
  const [, hasAuth] = useAuth();
  const authorized = useMemo(() => hasAuth(auth), [auth, hasAuth]);
  const [hasLoadInfo, setHasLoadInfo] = useState<boolean>(false);
  
  const loadUserInfo = () => {
    getUserInfo().then(res => {
      const user = res.data;
      userStore.setUser(user, user.roles);
    }).catch(console.warn).finally(() => {
      setHasLoadInfo(true);
    });
  };

  useEffect(() => {
    if (!isLogin && !hasLoadInfo) {
      loadUserInfo();
    }
  }, []);

  if (authorized) {
    return children as ReactElement<any, any>;
  }

  if (!hasLoadInfo) {
    return <SkeletonPage />;
  }

  Message.info('未登录或没有权限，为你跳转登录页。');

  return noMatch ? noMatch : <Navigate to={ redirectPath ? redirectPath : '/login' } />;
  
};

export default observer(AuthWrapper);