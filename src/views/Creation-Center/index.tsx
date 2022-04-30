import React from 'react';
import AuthorBasicInfo from './components/AuthorBasicInfo';
import styles from './index.module.scss';
import useStore from '@/hooks/useStore';
import { observer } from 'mobx-react-lite';
import CreationData from './components/CreationData';
import SkeletonPage from '@/components/Skeleton-Page';

const CreationCenter = () => {
  
  const { userStore } = useStore();
  
  return (
    userStore.userInfo ? (
      <div className={styles['creation-center']}>
        <AuthorBasicInfo userInfo={userStore.userInfo} />
        <div className={styles['creation-data-wrapper']}>
          <CreationData />
        </div>
      </div>
    ) : (
      <SkeletonPage />
    )
  );
};

export default observer(CreationCenter);