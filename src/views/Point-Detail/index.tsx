import React from 'react';
import styles from './index.module.scss';
import PointMain from './components/main';
import PointList from '@/components/Point-List';

const PointDetail: React.FC = () => {
  return (
    <div className={styles['point-detail']}>
      <div className={styles['point-main']}>
        <PointMain />        
      </div>
      <div className={styles['point-recommend']}>
        <PointList />        
      </div>
    </div>
  );
};

export default PointDetail;