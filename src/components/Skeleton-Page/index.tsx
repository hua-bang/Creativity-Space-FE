import React from 'react';
import styles from './index.module.scss';
import { Skeleton } from '@arco-design/web-react';

function SkeletonPage() {

  return (
    <div className={styles['skeleton-page']}>
      <Skeleton text={{ rows: 25 }}  />
    </div>
  );
}

export default SkeletonPage;