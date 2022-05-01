import { Statistic } from '@arco-design/web-react';
import React, { ReactElement } from 'react';
import styles from './index.module.scss';

interface CountItemProps {
  icon: ReactElement;
  title: string;
  count?: number;
  bgColor?: string;
}

const CountItem: React.FC<CountItemProps> = ({
  icon,
  title,
  count = 0,
  bgColor = '#e8f3ff'
}) => {
  return (
    <Statistic
      countUp={true}
      title={
        <span style={{ fontSize: '18px' }}>
          {title}
        </span>
      }
      value={count}
      groupSeparator
      prefix={
        <span style={{ background: bgColor }} className={styles['count-item-icon-area']}>
          {icon}
        </span>
      }
    />
  );
};

export default CountItem;