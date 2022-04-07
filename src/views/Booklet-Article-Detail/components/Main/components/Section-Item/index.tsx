import { BookletArticleStatusEnum } from '@/typings/booklet-article';
import React, { CSSProperties } from 'react';
import styles from './index.module.scss';
import { BookArticleStatusEnumMap } from '@/const/booklet-article';
import classNames from 'classnames';

interface SectionItemProps {
  onClick?: () => void;
  index: number;
  title: string;
  status: BookletArticleStatusEnum;
  style?: CSSProperties;
  active?: boolean;
}

const SectionItem: React.FC<SectionItemProps> = ({
  index,
  title,
  status,
  onClick,
  style,
  active
}) => {

  const wrapperClass = classNames(styles['section-item-wrapper'], active ? styles['active'] : '');
  return (
    <div style={style} onClick={onClick} className={wrapperClass}>
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