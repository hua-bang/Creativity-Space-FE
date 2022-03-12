import React, { ReactElement, useMemo } from 'react';
import useAuth from '@/hooks/useAuth';
import { observer } from 'mobx-react-lite';
import { Navigate, RouteObject } from 'react-router-dom';
import { Message } from '@arco-design/web-react';

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
  const [, hasAuth] = useAuth();
  const authorized = useMemo(() => hasAuth(auth), [auth, hasAuth]);
  
  if (authorized) {
    return children as ReactElement<any, any>;
  }
  
  Message.info('该页面需要登录，为你跳转其他页面。');

  return noMatch ? noMatch : <Navigate to={ redirectPath ? redirectPath : '/login' } />;
};

export default observer(AuthWrapper);