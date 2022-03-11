import React from 'react';
import styles from './index.module.scss';
import LoginTip from '../../../../components/Login-Tip';
import MenuList from './components/Menu-List';

const LeftMenu = () => {

  return (
    <div className={styles['left-menu']}>
      <LoginTip />
      <MenuList />
    </div>
  );
};

export default LeftMenu;