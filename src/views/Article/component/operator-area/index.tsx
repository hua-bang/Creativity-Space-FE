import { Article } from '@/typings/article';
import { IconHeart, IconMessage, IconSubscribe } from '@arco-design/web-react/icon';
import React from 'react';
import styles from './index.module.scss';

interface OperatorAreaProps {
  article?: Article;
}

const OperatorArea: React.FC<OperatorAreaProps> = ({
  article
}) => {
  
  const operationList = [
    {
      icon: <IconHeart />,
      count: article?.like_count || 0,
    },
    {
      icon: <IconMessage />,
      count: article?.comment_count || 0,
    },
    {
      icon: <IconSubscribe />,
      count: article?.collect_count || 0
    }
  ];

  return (
    <div className={styles['operation-area']}>
      {
        operationList.map((item, index) => (
          <div className={styles['operation-item']} key={index}>
            <div className={styles['operation-item-icon']}>
              {item.icon}
            </div>
            <div className={styles['operation-item-count']}>
              {item.count}
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default OperatorArea;