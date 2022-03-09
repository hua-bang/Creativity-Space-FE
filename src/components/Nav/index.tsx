import React from 'react';
import styles from './index.module.scss';
import SearchArea from './components/Search-Area';
import LoginArea from './components/Login-Area';
import InfoArea from './components/Info-Area';
import useStore from '@/hooks/useStore';
import { observer } from 'mobx-react-lite';

function Nav() {

  const { userStore } = useStore();

  return (
    <div className={styles['creativity-header']}>
      <div className={styles['creativity-header__container']}>
        <div className={styles['left-container']}>
          <SearchArea />
        </div>
        <div onClick={() => {userStore.setTest();}}>123</div>
        <div className={styles['right-container']}>
          {
            userStore.isLogin 
              ? <InfoArea />
              : <LoginArea />
          }
        </div>
      </div>
    </div>
  );
}

export default observer(Nav);