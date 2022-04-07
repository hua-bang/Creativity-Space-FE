import { BookletArticleStatusEnum } from '@/typings/booklet-article';
import React from 'react';
import styles from './index.module.scss';
import { BookArticleStatusEnumMap } from '@/const/booklet-article';

interface SectionItemProps {
  onClick?: () => void;
  index: number;
  title: string;
  status: BookletArticleStatusEnum;
}

const SectionItem: React.FC<SectionItemProps> = ({
  index,
  title,
  status,
  onClick
}) => {
  return (
    <div onClick={onClick} className={styles['section-item-wrapper']}>
      <div className={styles['section-item-index']}>
        {index}
      </div>
      <div className={styles['section-item-info']}>
        <div className={styles['section-item-title']}>
          {title}
        </div>
        <div className={styles['section-item-status']}>{BookArticleStatusEnumMap[status]}</div>
      </div>
    </div>
  );
};

export default SectionItem;