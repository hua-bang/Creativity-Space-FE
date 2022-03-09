import React from 'react';
import styles from './index.module.scss';
import LoginTip from '../../../../components/Login-Tip';
import MenuList from './components/Menu-List';
import useAuth from '@/hooks/useAuth';
import { observer } from 'mobx-react-lite';

const LeftMenu = () => {
  const isLogin = useAuth();

  return (
    <div className={styles['left-menu']}>
      {isLogin ? 'true' : 'false'}
      <LoginTip />
      <MenuList />
    </div>
  );
};

export default observer(LeftMenu);