import React from 'react';
import { IconBook, IconEdit, IconMessage, IconUser } from '@arco-design/web-react/icon';
import CountItem from '@/components/Count-Item';
import styles from './index.module.scss';
import CountInfo from './components/CountInfo';
import ToAudit from './components/ToAudit';

const CreationOverview = () => {

  return (
    <div className={styles['creation-overview']}>
      <CountInfo />
      <ToAudit />
    </div>
  );
};

export default CreationOverview;