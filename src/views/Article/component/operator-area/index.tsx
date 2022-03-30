import { Article } from '@/typings/article';
import { IconHeart, IconMessage, IconSubscribe } from '@arco-design/web-react/icon';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { likeArticle } from '@/api/article';
import { Message } from '@arco-design/web-react';

interface OperatorAreaProps {
  article?: Article;
}

const DefaultCountInfo = {
  like_count: 0,
  comment_count: 0,
  collect_count: 0
};

const OperatorArea: React.FC<OperatorAreaProps> = ({
  article
}) => {

  const { like_count, collect_count, comment_count  } = article || DefaultCountInfo;

  const [articleCountInfo, setArticleCountInfo ] = useState({
    like_count,
    collect_count,
    comment_count
  });
  

  const handleLikeClick = () => {
    if (article) {
      likeArticle(article.id).then(res => {
        Message.success('操作成功');
        console.log(res);
        setArticleCountInfo(prev => ({
          ...prev,
          like_count: res.data.likeCount
        }));           
      }).catch(err => {
        Message.warning('点赞有误，稍后再试。');
      });
    }
  };

  const operationList = [
    {
      icon: <IconHeart />,
      count: articleCountInfo.like_count,
      onClick: handleLikeClick 
    },
    {
      icon: <IconMessage />,
      count: articleCountInfo.comment_count,
      onClick: handleLikeClick
    },
    {
      icon: <IconSubscribe />,
      count: articleCountInfo.collect_count,
      onClick: handleLikeClick
    }
  ];

  return (
    <div className={styles['operation-area']}>
      {
        operationList.map((item, index) => (
          <div onClick={item.onClick} className={styles['operation-item']} key={index}>
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