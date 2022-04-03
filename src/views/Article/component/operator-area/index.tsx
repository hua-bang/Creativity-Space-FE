import { Article } from '@/typings/article';
import { IconHeart, IconHeartFill, IconMessage, IconShareExternal, IconSubscribe, IconSubscribed } from '@arco-design/web-react/icon';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { likeArticle, followArticle } from '@/api/article';
import { Message } from '@arco-design/web-react';
import { getArticleLikeInfo } from '@/api/article';
import { toAnchor } from '@/utils/common';

interface OperatorAreaProps {
  article: Article;
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

  const [userLikeInfo, setUserLikeInfo] = useState({
    like: false,
    follow: false
  });
  

  const handleLikeClick = () => {
    if (article) {
      likeArticle(article.id).then(res => {
        Message.success('操作成功');
        setArticleCountInfo(prev => ({
          ...prev,
          like_count: res.data.likeCount
        }));
        setUserLikeInfo(prev => ({
          ...prev,
          like: !prev.like
        }));          
      }).catch(err => {
        Message.warning('点赞有误，稍后再试。');
      });
    }
  };

  const handleFollowClick = () => {
    followArticle(article.id).then(res => {
      Message.success('操作成功。');
      setArticleCountInfo(prev => ({
        ...prev,
        collect_count: res.data.collectCount
      }));
      setUserLikeInfo(prev => ({
        ...prev,
        follow: !prev.follow
      }));
    }).catch(() => {
      Message.warning('收藏请求错误，请稍后再试。');
    });
  };

  const handleCommentClick = () => {
    toAnchor('#article-comment');
  };

  const operationList = [
    {
      icon: userLikeInfo.like ? (<IconHeartFill />) : (<IconHeart />),
      count: articleCountInfo.like_count,
      onClick: handleLikeClick
    },
    {
      icon: <IconMessage />,
      count: articleCountInfo.comment_count,
      onClick: handleCommentClick
    },
    {
      icon: userLikeInfo.follow ? (<IconSubscribed />) : (<IconSubscribe />),
      count: articleCountInfo.collect_count,
      onClick: handleFollowClick
    },
    {
      icon: <IconShareExternal />,
      onClick: () => {
        // TODO: use copy lib
        Message.success('链接已复制剪贴板。');
      }
    }
  ];

  const loadUserLikeInfo = () => {
    getArticleLikeInfo(article.id).then(res => {
      const data = Object.keys(res.data).reduce((prev, curr) => {
        prev[curr] = !!res.data[curr];
        return prev;
      }, {} as Record<string, any>);
      setUserLikeInfo(data as any);
    });
  };

  useEffect(() => {
    loadUserLikeInfo();
  }, []);

  return (
    <div className={styles['operation-area']}>
      {
        operationList.map((item, index) => (
          <div onClick={item.onClick} className={styles['operation-item']} key={index}>
            <div className={styles['operation-item-icon']}>
              {item.icon}
            </div>
            {
              item.count !== undefined && (
                <div className={styles['operation-item-count']}>
                  {item.count}
                </div>
              )
            }
          </div>
        ))
      }
    </div>
  );
};

export default OperatorArea;