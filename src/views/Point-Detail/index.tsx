import React from 'react';
import styles from './index.module.scss';
import PointMain from './components/main';

const PointDetail: React.FC = () => {
  return (
    <div className={styles['point-detail']}>
      <div className={styles['point-main']}>
        <PointMain />        
      </div>
      <div className={styles['point-recommend']}>2</div>
    </div>
  );
};

export default PointDetail;