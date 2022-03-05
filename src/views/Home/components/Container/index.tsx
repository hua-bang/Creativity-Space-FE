import React from 'react';
import { useRoutes } from 'react-router-dom';
import styles from './index.module.scss';
import LeftMenu from '../Left-Menu';
import NoticeArea from '../Notice-Area';
import menuList from '../../routes';

const Container = () => {
  console.log('container');

  return (
    <div className={styles['home_container']}>
      <div className={styles['left-menu']}>
        <LeftMenu />
      </div>
      <div className={styles['main-content']}>
        {useRoutes(menuList)}
      </div>
      <div className={styles['right-notice']}>
        <NoticeArea />
      </div>
    </div>
  );
};

export default Container;