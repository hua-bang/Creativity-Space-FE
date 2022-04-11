import React from 'react';
import styles from './index.module.scss';
import LoginTip from '../../../../components/Login-Tip';
import MenuList from './components/Menu-List';
import BookletRecommendList from '@/components/Booklet-Recommend-List';

const LeftMenu = () => {

  return (
    <div className={styles['left-menu']}>
      <LoginTip />
      <MenuList />
      <div style={{ marginTop: '20px' }}>
        <BookletRecommendList />
      </div>
    </div>
  );
};

export default LeftMenu;