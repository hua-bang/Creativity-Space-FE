import React from 'react';
import styles from './index.module.scss';
import SearchArea from './components/Search-Area';
import LoginArea from './components/Login-Area';

function Nav() {

  return (
    <div className={styles['creativity-header']}>
      <div className={styles['creativity-header__container']}>
        <div className={styles['left-container']}>
          <SearchArea />
        </div>
        <div className={styles['right-container']}>
          <LoginArea />
        </div>
      </div>
    </div>
  );
}

export default Nav;